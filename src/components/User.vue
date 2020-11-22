<template>
  <div v-if="currentUser" class="edit-form">
    <form>
      <div class="form-group">
        <label for="title">Nombre y apellido</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentUser.name"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea 
          class="form-control" 
          id="description" 
          rows="3" 
          v-model="currentUser.description"></textarea>
      </div>

      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentUser.status ? "Activo" : "Inactivo" }}
      </div>
    </form>

    <div class="form-row">
      <div class="form-group col-md-4">
        <button class="btn btn-primary"
          v-if="currentUser.status"
          @click="updatePublished(false)"
        >
        <i class="fa fa-ban" title="Desactivar usuario"></i>
        </button>

        <button class="btn btn-primary" 
          v-else
          @click="updatePublished(true)"
        >
        <i class="fa fa-check" title="Activar usuario"></i>
        </button>
      </div>
      <div class="form-group col-md-4">
        <button class="btn btn-danger"><i class="fa fa-trash" title="Eliminar usuario" @click="deleteUser"></i></button>
      </div>
      <div class="form-group col-md-4">
        <button class="btn btn-warning"><i class="fa fa-refresh" title="Actualizar datos de usuario" @click="updateUser" style="color: #FFFFFF"></i></button>
      </div>
    </div>

  

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  props: ["user"],
  data() {
    return {
      currentUser: null,
      message: ""
    };
  },
  watch: {
    user: function(user) {
      this.currentUser = { ...user };
      this.message = "";
    }
  },
  methods: {
    updatePublished(status) {
      UserDataService.update(this.currentUser.key, {
        status: status,
      })
        .then(() => {
          this.currentUser.published = status;
          this.message = "El estado ha sido cambiado...";
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      const data = {
        name: this.currentUser.name,
        description: this.currentUser.description
      };

      UserDataService.update(this.currentUser.key, data)
        .then(() => {
          this.message = "Datos de usuario actualizados correctamente...";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.currentUser = { ...this.user };
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

</style>