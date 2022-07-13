<template>
  <div>
    <br />
    <vue-tree-list
      @click="onClick"
      @change-name="onChangeName"
      @delete-node="onDel"
      @add-node="onAddNode"
      :model="data"
      default-tree-node-name="new node"
      default-leaf-node-name="new leaf"
      v-bind:default-expanded="false"
    >
      <span class="icon" slot="addTreeNodeIcon">📂</span>
      <span class="icon" slot="addLeafNodeIcon">＋</span>
      <span class="icon" slot="editNodeIcon">📃</span>
      <span class="icon" slot="delNodeIcon">✂️</span>
      <span class="icon" slot="leafNodeIcon">🍃</span>
      <span class="icon" slot="treeNodeIcon">🌲</span>
    </vue-tree-list>
  </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
import { toTree } from "../assets/js/tree";
import axios from "axios";

export default {
  components: {
    VueTreeList
  },
  computed: {},

  mounted() {},
  data() {
    return {
      newTree: {},
      data: this.fetch() ,
    };
  },
  methods: {
    onDel (node) {
      console.log(node)
      node.remove()
    },

    onChangeName (params) {
      console.log(params)
    },

    onAddNode (params) {
      console.log(params)
    },

    onClick (params) {
      console.log(params)
    },

    addNode() {
      var node = new TreeNode({ name: "new node", isLeaf: false });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(node);
    },

    fetch() {
      let fetching = axios
        .get(process.env.VUE_APP_KPI_API_BASE_URL + "/ks/path/VTN")
        .then(response => {
          let kpis = response.data
          let treeKpis = toTree(kpis);
          this.data = new Tree(treeKpis)
          console.log(fetching);
        });
    },

    getNewTree() {
      var vm = this;
      function _dfs(oldNode) {
        var newNode = {};

        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        }
        return newNode;
      }

      vm.newTree = _dfs(vm.data);
    }
  }
};
</script>

<!--
<style lang="less" rel="stylesheet/less">
    .vtl {
        .vtl-drag-disabled {
            background-color: #d0cfcf;
            &:hover {
                background-color: #d0cfcf;
            }
        }
        .vtl-disabled {
            background-color: #d0cfcf;
        }
    }
</style>

<style lang="less" rel="stylesheet/less" scoped>
    .icon {
        &:hover {
            cursor: pointer;
        }
    }
</style>-->
<style>
th,
td {
  width: 50px;
  text-align: left;
}
</style>
