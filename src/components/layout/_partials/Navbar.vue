<template>
    <nav>
      <div class="navBrand">
        <ButtonIcon @click.prevent="sidebarToggle"><MenuIcon /></ButtonIcon>
        <img src="@/assets/images/keep-logo.png" />
        <span>Keep</span>
      </div>
      
      <form class="navSearch" action="#" ref="navSearch">
        <SearchIcon class="searchIcon" />
        <input class="searchInput" @focus="searchOnFocus" @blur="searchOnBlur" placeholder="Telusuri" v-model="search" />
        <div class="clearButton" @click.prevent="clearSearchHandler" v-if="search">
          <CancelIcon />
        </div>
      </form>
      <div class="navAction">
        <ButtonIcon @click.prevent="refreshHandler">
          <RefreshIcon v-if="!sync"/>
          <SpinnerIcon v-else/>
        </ButtonIcon>
        <ButtonIcon @click.prevent="changeNotesLayout">
          <ListIcon v-if="notesLayout == 'grid'"/>
          <GridIcon v-else />
        </ButtonIcon>
      </div>
    </nav>
</template>
<script>
export default {
  data(){
    return{
      search: null,
      notesLayout: 'grid',
      sync: false,
    }
  },
  methods:{
    clearSearchHandler(){
      this.search = null;
    },
    searchOnFocus(e){
      this.$refs.navSearch.classList.add('focus')
    },
    searchOnBlur(e){
      this.$refs.navSearch.classList.remove('focus')
    },
    sidebarToggle(){
      this.emitter.emit('sidebar-toggle');
    },
    refreshHandler(){
      this.emitter.emit('get-notes');
    },
    changeNotesLayout(){
      switch(this.notesLayout){
        case 'grid':
          this.notesLayout = 'list';
          break;
        default:
          this.notesLayout = 'grid';
      }

      this.emitter.emit('notes-layout', this.notesLayout)
    }
  },
  created(){
    this.emitter.on('sync', (sync) => {
      this.sync = sync;
    })
  }
}
</script>
<style lang="scss">
nav{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  background: $body-background;
  height: $header-height;
  overflow: hidden;

  & > div {
    padding: 0 8px;
  }

  .navBrand{
    display: flex;
    align-items: center;

    img{
      width: 40px;
      height: 40px;
    }

    span{
      display: block;
      margin-left: 4px;
      font-size: $fz-xl;
    }
  }

  .navSearch{
    width: 40%;
    display: flex;
    align-items: center;
    border-radius: $radius;
    background-color: rgba(241,243,244,.24);
    padding: 0 20px;
    transition: $transition;
    height: 70%;

    .searchIcon{ fill: white }
    .searchInput{
      outline: none;
      border: none;
      background:none;
      width: calc(100% - 50px);
      font-size: 16px;
      color: white;
      margin: 0 10px;
      &::placeholder{
        color: white;
      }
    }
    .clearButton{
      cursor: pointer;
      svg{ fill: rgba(255,255,255,.5); }
      
      &:hover{
        svg{ fill: rgba(255,255,255,1); }
      }
    }

    &.focus{
      background-color: rgba(255,255,255,1);

      .searchIcon{ fill: black; }
      .searchInput{
        color: black;
        &::placeholder{ color: #5f6368; }
      }
      .clearButton{
        svg{ fill: #5f6368; }
        &:hover{
          svg{ fill: black;}
        }
      }
    }
  }

  .navAction{
    display: flex;
    align-items: center;
  }
}
</style>