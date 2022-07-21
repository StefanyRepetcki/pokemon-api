<template>
  <div>
    <nav class="menu">
      <div class="menu__logo">
        <a href="/">
          <span>Pokemon</span>
          <hr />
        </a>
      </div>

      <ul class="menu__links">
        <li :class="{ 'menu__links--active': redirectMenu === '/' }"><i class="fas fa-home" aria-hidden="true"></i><a
            @click="redirectTo('#/')">Home</a></li>
        <hr />
        <li :class="{ 'menu__links--active': redirectMenu !== '/' }"><i class="fas fa-list-alt"></i><a
            @click="redirectTo('#/list')">Lista</a>
        </li>
      </ul>
      <div class="menu__mobile" @click="showMenu()">
        <div class="menu__top"></div>
        <div class="menu__body"></div>
        <div class="menu__bottom"></div>
      </div>
    </nav>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      redirectMenu: window.location.pathname,
    };
  },
  methods: {
    redirectTo(to) {
      if (window.innerWidth < 768) {
        this.showMenu();
      }
      window.location.href = to;
    },
    showMenu() {
      document.querySelector('.menu__mobile').classList.toggle('toggle');
      document.querySelector('.menu__links').classList.toggle('nav--active');
      document.querySelector('.background').classList.toggle('mobile--active');
    }
  },
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
}

.mobile--active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2C2C2D;
  z-index: 1;
}

hr {
  width: 160px;
  margin: auto;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  min-height: 8vh;
  background-color: transparent;
  z-index: 2;
  position: relative;

  &__logo {
    span {
      margin: 20px 0;
      color: #fff;
      font-size: 20px;
      font-weight: 400;
    }

    hr {
      display: none;
    }
  }

  &__mobile {
    display: none;
    cursor: pointer;

    div {
      width: 25px;
      height: 3px;
      background-color: white;
      margin: 5px;
      transition: all 0.3s ease;
    }
  }

  &__links {
    display: flex;
    justify-content: space-around;
    width: 50%;

    li {
      list-style: none;
    }

    a {
      color: white;
      text-decoration: none;
      letter-spacing: 3px;
      font-weight: 700;
      font-size: 25px;
    }

    i {
      margin-right: 30px;
    }
  }
}

a {
  text-decoration: none;
  display: flex;
}

@media only screen and (min-width: 768px) {
  .menu {
    max-width: 860px;
    margin: 0 auto;

    &__links {
      li {
        width: 200px;
        display: flex;
        justify-content: center;
      }

      a {
        font-size: 16px;
        font-weight: 400;
      }

      &--active {
        a {
          font-weight: 700;
        }
      }

      hr {
        width: 36px;
        transform: rotate(-89.98deg);
        border: 1px solid #FFFFFF;
      }
    }

    &__logo {

      hr {
        display: block;
        margin-left: 19px;
        width: 70px;
        border: 1px solid #FFFFFF;
      }
    }
  }

  i {
    display: none;
  }
}

@media screen and (max-width:768px) {
  .menu {
    &__links {
      position: fixed;
      right: 0;
      height: 100px;
      top: 100px;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      width: 100%;
      transform: translateX(100%);
      transition: transform 0.5s ease-in;

      li {
        opacity: 0;
      }
    }

    &__mobile {
      display: block;
    }
  }
}

.nav--active {
  transform: translateX(0%);
}

.toggle {
  .menu {
    &__top {
      transform: rotate(-45deg) translate(-5px, 6px);
    }

    &__body {
      opacity: 0;
    }

    &__bottom {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  }
}

@media screen and (max-width: 768px) {
  .menu__links.nav--active li {
    opacity: 1;
    display: flex;
    padding: 30px;
    line-height: 33px;
    letter-spacing: 2px;
  }
}
</style>
