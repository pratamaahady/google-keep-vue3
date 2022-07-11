<template>
    <div :class="['sidebarWrapper', hide ? 'hide' : '']">
      <div class="sidebar">
        <div class="sidebarMenu">
          <router-link to="/" custom v-slot="{ navigate, isActive }">
            <div :class="['sidebarMenuItem',isActive ? 'active' : '']" @click="navigate">
              <div class="btnIcon"><GoogleKeepIcon /></div>
              <span>Catatan</span>
            </div>
          </router-link>
          <router-link to="/reminder" custom v-slot="{ navigate, isActive }">
            <div :class="['sidebarMenuItem',isActive ? 'active' : '']" @click="navigate">
              <div class="btnIcon"><BellIcon /></div>
              <span>Pengingat</span>
            </div>
          </router-link>
          <router-link :to="`/label/${label.name}`" custom v-slot="{ navigate, isActive }" v-for="label in labels" :key="label">
            <div :class="['sidebarMenuItem',isActive ? 'active' : '']" @click="navigate">
              <div class="btnIcon"><LabelIcon /></div>
              <span>{{ label.name }}</span>
            </div>
          </router-link>
          <div class="sidebarMenuItem" @click.prevent="editLabelHandler">
            <div class="btnIcon"><PencilIcon /></div>
            <span>Edit Label</span>
          </div>
          <router-link to="/archive" custom v-slot="{ navigate, isActive }">
            <div :class="['sidebarMenuItem',isActive ? 'active' : '']" @click="navigate">
              <div class="btnIcon"><ArchiveIcon /></div>
              <span>Arsipkan</span>
            </div>
          </router-link>
          <router-link to="/trash" custom v-slot="{ navigate, isActive }">
            <div :class="['sidebarMenuItem',isActive ? 'active' : '']" @click="navigate">
              <div class="btnIcon"><TrashIcon /></div>
              <span>Sampah</span>
            </div>
          </router-link>
        </div>
        <div class="sidebarFooter">
          <div class="sidebarFooterIcon">
            <img src="@/assets/images/firebase-logo.png" height="30"/>
            <img src="@/assets/images/vue-logo.png" height="30"/>
            <img src="@/assets/images/keep-logo.png" height="30"/>
          </div>
          <a href="javascript:;">Lisensi open source</a>
        </div>
      </div>
    </div>
    <LabelForm ref="labelForm"></LabelForm>
</template>
<script>
import { label } from '@/firebase/firestore'
import LabelForm from '@/pages/widgets/LabelFormWidget.vue'
export default {
  components:{ LabelForm },
  props:{
    hide: Boolean
  },
  data(){
    return {
      labels: [],
    }
  },
  methods:{
    fetchLabels(){
      label.getLabels()
        .then(snapshot => {
          this.labels = snapshot.docs.map(doc => doc.data());
        })
    },
    editLabelHandler(){
      this.$refs.labelForm.show()
    }
  },
  created(){
    this.emitter.on('get-labels', () => {
      this.fetchLabels();
    });
  },
  mounted(){
    this.fetchLabels();
  }
}
</script>
<style lang="scss">
.sidebarWrapper{
    min-width: $sidebar-width;
    transition: $transition;

    .sidebar{
        position: fixed;
        height: calc(100vh - #{$header-height} - 5px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: $sidebar-width;
        transition: $transition;

        .sidebarMenu{
            padding-top: 10px;
            transition: $transition;

            .sidebarMenuItem{
                display: flex;
                align-items: center;
                padding-left: 12px;
                border-radius: 0 25px 25px 0;
                text-decoration: none;
                color: inherit;
                transition: $transition;
                cursor: pointer;

                span{
                    white-space: nowrap;
                    overflow: hidden;
                }

                .btnIcon{
                    transition: $transition;
                    &:hover{
                        background-color: transparent;
                        svg{
                            fill: #9aa0a6;
                            path{
                                fill: #9aa0a6;
                            }
                        }
                    }
                }

                &.active{
                    background: #41331c !important;
                    svg{
                        fill: white;
                        path{ fill: white; }
                    }

                    &:hover{
                      svg{
                        fill: white;
                        path{ fill: white; }
                      }
                    }
                }

                &:hover{
                    background-color: rgba(232,234,237,.08);
                }
            }
        }

        .sidebarFooter{
            padding: 20px 24px;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;

            .sidebarFooterIcon{
              margin-bottom: 1rem;

              img{
                margin-right: 1rem;
              }
            }

            a{
                text-decoration: none;
                color: #9aa0a6;
                white-space: nowrap;
            }
        }
    }

    &.hide{
      min-width: $sidebar-minimize-width;

      .sidebar{
        width: $sidebar-minimize-width;

        .sidebarMenu{
            .sidebarMenuItem{
                span{ width: 0; }
                &.active{
                    background-color: transparent !important;

                    .btnIcon{
                        background-color: #41331c !important;
                    }
                }

                &:hover{
                    background-color: transparent !important;
                    .btnIcon{
                        background-color: rgba(232,234,237,.08) !important;
                    }
                }
            }
        }
        .sidebarFooter{
            width: 0;
            padding: 0;
        }        
      }
    }
}
</style>