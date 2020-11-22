<template>
  <div class="list row">
    <div class="col-md-8">
      <h4>Lista de usuarios</h4>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Buscar usuario..." aria-label="Search" v-model="search">
      </form>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in filteredUsers"
          :key="index"
          @click="setActiveUser(user, index)"
        >
         <img src="@/assets/img_avatar.png" alt="Avatar" class="avatar"> 
          {{ user.name }} -
          {{ user.description }}
        </li>
      </ul>
    </div>
    <div class="col-md-4">
      <div v-if="currentUser">
        <user-details
          :user="currentUser"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Presiona en el usuario por favor</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import UserDetails from "./User";

export default {
  name: "users-list",
  components: { UserDetails },
  data() {
    return {
      users: [],
      search: "",
      currentUser: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _users = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _users.push({
          key: key,
          name: data.name,
          description: data.description,
          status: data.status,
        });
      });

      this.users = _users;
    },

    refreshList() {
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },

    removeAllUsers() {
      UserDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchUser() {
      UserDataService.findByName(this.name)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {
    filteredUsers () {
      return this.users.filter((user) => {
        return user.name.match(this.search)
      });
    }
  },
  // Metodos de ciclo de vida de Vue para la deteccion de cambios
  mounted() {
    UserDataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    UserDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>