<template>
  <section class="about">
    <header>
      <div class="about-header">
        <div>
          <i class="fas fa-globe"></i>
        </div>
        <div class="about-header-title">Inspiring Examples Of BESTASK</div>
        <div class="about-header-text">
          People use BESTASK for every kind of project imaginable.
          The following are examples that you can use BESTASK to stay organized.
        </div>
        <div>
          <carousel autoplay loop>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-ring"></i>
              </div>
              <div class="text-carousel">Weddings</div>
            </slide>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-map-marked-alt"></i>
              </div>
              <div class="text-carousel">Vacation</div>
            </slide>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-book"></i>
              </div>
              <div class="text-carousel">Recipes</div>
            </slide>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-search-dollar"></i>
              </div>
              <div class="text-carousel">Job Search</div>
            </slide>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-project-diagram"></i>
              </div>
              <div class="text-carousel">Project Management</div>
            </slide>
            <slide class="slide-container">
              <div class="icon-carousel">
                <i class="fa fa-calendar-alt"></i>
              </div>
              <div class="text-carousel">Editorial Calendar</div>
            </slide>
          </carousel>
        </div>
      </div>
    </header>
    <main>
      <div class="about-main"></div>
    </main>
    <footer>
      <section class="about-footer">
        <div>
          <img class="img-footer-title" src="../../img/bestask-logo-black.png" alt>
        </div>
        <div class="text-about">
          <div class="about-me">
            <img class="img-footer" src="../../img/small-logo.png" alt>
            <h1 class="about-me-name">Nir</h1>
            <h2 class="about-me-Occupation">Web Developer</h2>
            <ul class="Social">
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-facebook-f facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-twitter twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-whatsapp whatsapp"></i>
                </a>
              </li>
              <li>
                <a href="#" class="linkedin Social-sites">
                  <i class="fab fa-linkedin-in linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="about-me">
            <img class="img-footer" src="../../img/small-logo.png" alt>
            <h1 class="about-me-name">Itai</h1>
            <h2 class="about-me-Occupation">Web Developer</h2>
            <ul class="Social">
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-facebook-f facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-twitter twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-whatsapp whatsapp"></i>
                </a>
              </li>
              <li>
                <a href="#" class="linkedin Social-sites">
                  <i class="fab fa-linkedin-in linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="about-me">
            <img class="img-footer" src="../../img/small-logo.png" alt>
            <h1 class="about-me-name">Eliyahu Hillel</h1>
            <h2 class="about-me-Occupation">Web Developer</h2>
            <ul class="Social">
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-facebook-f facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-twitter twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" class="Social-sites">
                  <i class="fab fa-whatsapp whatsapp"></i>
                </a>
              </li>
              <li>
                <a href="#" class="linkedin Social-sites">
                  <i class="fab fa-linkedin-in linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  </section>
</template>


<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  }
};
</script>


<style lang='scss' scoped>
.about {
  font-family: Acme-Regular;
  background-color: rgba(0, 68, 255, 0.678);
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  .about-header {
    margin: 0 auto;
    width: 700px;
    margin-top: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .fa-globe {
      color: rgb(124, 203, 255);
      font-size: 100px;
      margin-bottom: 40px;
    }
    .about-header-title {
      color: white;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .about-header-text {
      margin-bottom: 40px;
      color: white;
      font-size: 22px;
    }
    .slide-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .fa {
        color: rgb(124, 203, 255);
        font-size: 40px;
        margin-bottom: 30px;
      }
      .text-carousel {
        color: white;
        font-size: 22px;
      }
    }
  }
  .about-footer {
    padding-top: 140px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(131, 131, 131);
    font-size: 25px;
    .img-footer-title {
      width: 300px;
    }
    .text-about {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .about-me {
        .img-footer {
          border-radius: 50%;
          border: 2px solid rgb(36, 36, 36);
          width: 110px;
          margin-bottom: 9px;
        }
        padding: 80px 40px 0;
        .about-me-name {
          margin-bottom: 9px;
          font-size: 22px;
        }
        .about-me-Occupation {
          margin-bottom: 9px;
          font-size: 18px;
        }
      }
    }
    .Social {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .fab {
        padding: 4px;
      }
      .twitter,
      .facebook,
      .whatsapp,
      .linkedin {
          transition: 0.2s;
      }
      .twitter:hover {
        color: #1da1f2;
      }
      .facebook:hover {
        color: #29487d;
      }
      .whatsapp:hover {
        color: #2bc444;
      }
      .linkedin:hover {
        color: rgb(2, 45, 126);
      }
    }
  }
}
// @media (min-width: 850px) {
//   .home-btns {
//   }
// }
</style>
