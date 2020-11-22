<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="user.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="user.description"
          name="description"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Guardar</button>
    </div>

    <div v-else>
      <h4>Usuario almacenado con éxito!</h4>
      <button class="btn btn-success" @click="newUser">Añadir usuario</button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        name: "",
        description: "",
        status: false
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        description: this.user.description,
        status: false
      };
      //Funcion para obtener los valores del formulario
      UserDataService.create(data)
        .then(() => {
          console.log("Lo hemos creado con éxito...");
          this.submitted = true;
        })
        .catch(e => {
          console.log("Ha ocurrido el siguiente error => " + e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {
        user: "",
        description: "",
        status: false
      };
    }
  }
};
</script>
