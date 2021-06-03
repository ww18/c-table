<template>
  <div id="app">
    <c-table
      :span-method="objectSpanMethod"
      tooltip-effect="dark"
      class="tree-table"
      :cell-class-name="setTdClassName"
      :header-cell-style="dois"
      @row-contextmenu="rightClick"
      @row-click="clickTableRow"
      border
      :height="250"
      :data="tableData"
      style="width: 100%"
    >
      <template v-for="item in colums">
        <el-table-column
          v-if="!item.children"
          :key="item.name"
          :prop="item.props"
          fixed
          :label="item.name"
          width="150"
        >
        </el-table-column>
        <template v-else>
          <el-table-column
            v-for="(child, index) in item.children"
            :key="child.name"
            :prop="child.props"
            :label="child.name"
            width="150"
          >
            <el-table-column
              :index="index == 0 ? item.children.length : 0"
              :prop="child.props"
              :label="item.name"
              width="150"
            >
            </el-table-column>
          </el-table-column>
        </template>
      </template>
    </c-table>
    <div id="menu">
      <div
        class="menu"
        v-for="(item, index) in menus"
        :key="index"
        @click.stop="infoClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import cTable from "./components/c_table/table.vue";

export default {
  name: "App",
  components: {
    cTable,
  },
  data() {
    return {
      menus: ["详细信息", "方案分析", "方案存库", "清除方案"],
      colums: [
        { name: "楼层", props: "floorName" },
        { name: "区域", props: "areaName" },
        {
          name: "2.桩基工程",
          props: "date",
          children: [
            { name: "2.1", props: "123" },
            { name: "2.2", props: "234" },
            { name: "2.3", props: "345" },
          ],
        },
        {
          name: "3.桩基工程",
          props: "date",
          children: [
            { name: "3.1", props: "456" },
            { name: "3.2", props: "567" },
            { name: "3.3", props: "678" },
          ],
        },
      ],
      tableData: [
        {
          floorName: "1F",
          floorId: "1",
          areaId: "2",
          areaName: "区域1",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "1F",
          floorId: "1",
          areaId: "2",
          areaName: "区域2",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "1F",
          floorId: "1",
          areaId: "2",
          areaName: "区域3",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "2F",
          floorId: "1",
          areaId: "2",
          areaName: "区域1",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "2F",
          floorId: "1",
          areaId: "2",
          areaName: "区域1",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "3F",
          floorId: "1",
          areaId: "2",
          areaName: "区域2",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "3F",
          floorId: "1",
          areaId: "2",
          areaName: "区域3",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
        {
          floorName: "4F",
          floorId: "1",
          areaId: "2",
          areaName: "区域1",
          123: "2016-05-02",
          234: "2016-05-02",
          345: "2016-05-02",
          456: "2016-05-02",
          567: "2016-05-02",
          678: "2016-05-02",
        },
      ],
      spanArr: [], //存放第一列合并的个数
      isFit: false, //控制没有数据情况下让列的宽度是否自撑开
      playUpOnce: true, //计算colspan和rowspan只计算一次
      property: {},
      imgList: {},
    };
  },
  created() {
    // this.getSpanArr();
  },
  methods: {
    //渲染节点等级字体颜色
    setSpanClassName(row, index) {
      if (index === 1) {
        return "tree-level" + row._level;
      }
      return "";
    },
    //渲染表格的颜色（根据状态）
    setTdClassName({ row, column, columnIndex }) {
      if (columnIndex > 1) {
        let status = row[String(column.property)].completeStatus;
        let className = "tree-status" + status;
        return className;
      }
    },
    //渲染表格内容
    setTdValue(dataIndex, row, index) {
      if (index === 1 || index === 0) {
        return row[String(dataIndex)];
      } else if (index > 1) {
        let status = row[String(dataIndex)].completeStatus;
        if (status == 2 || status == 3) {
          //施工完成和未初始化不展示百分比
          let percent = row[String(dataIndex)].completePercent;
          if (percent != "0.00%") {
            //已经初始化但未开始施工也不展示百分比
            return row[String(dataIndex)].completePercent;
          }
        }
      }
    },
    //合并单元格
    getSpanArr() {
      let pos = 0;
      this.spanArr = [];
      for (var i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          // pos = 0;
        } else {
          if (
            this.tableData[i]["floorName"] ===
            this.tableData[i - 1]["floorName"]
          ) {
            // if(this.tableData[i]._show){
            this.spanArr[pos] += 1;
            this.spanArr.push(0);
            // }
          } else {
            this.spanArr.push(1);
            pos = i;
          }
        }
      }
      this.playUpOnce = false;
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //每次只执行一次，只有当table展开的时候才会再渲染
        this.playUpOnce && this.getSpanArr();
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    dois({ column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        console.log(columnIndex);
        this.$nextTick(() => {
          //由于加了头部固定，所以需要两个循环
          var wrapper = document.getElementsByClassName(
            "el-table__fixed-header-wrapper"
          );
          var wrapper1 = document.getElementsByClassName(
            "el-table__header-wrapper"
          );
          this.dealColspanHeader(wrapper, column);
          this.dealColspanHeader(wrapper1, column);
        });

        return column;
      }
    },
    dealColspanHeader(wrapper, column) {
      for (let i = 0; i < wrapper.length; i++) {
        let _c = wrapper[i].getElementsByClassName(column.id);
        if (_c.length > 0) {
          if (column.index === 0) {
            _c[0].setAttribute("style", "display:none");
          } else if (column.index > 0) {
            _c[0].setAttribute("colspan", column.index);
          }
        }
      }
    },
    // table的左键点击当前行事件
    clickTableRow(row, column, event) {
      var menu = document.querySelector("#menu");
      menu.style.display = "none";
      // console.log(row,column,event)
    },
    //右键点击，当某一行被鼠标右键点击后
    rightClick(row, column, event) {
      var menu = document.querySelector("#menu");
      event.preventDefault();
      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      // 改变自定义菜单的隐藏与显示
      menu.style.display = "block";
    },
    // 自定义菜单的点击事件
    infoClick(index) {
      this.$alert(
        "当前table的下标为" + this.currentRowIndex,
        "你点击了自定义菜单的" + this.menus[index] + "功能",
        {
          confirmButtonText: "确定",
          callback: (action) => {
            var menu = document.querySelector("#menu");
            menu.style.display = "none";
          },
        }
      );
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.05);
}
#menu {
  width: 120px;
  height: 100px;
  overflow: hidden; /*隐藏溢出的元素*/
  box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
  position: absolute;
  display: none;
  background: #ffffff;
  z-index: 10;
}

.menu {
  width: 125px;
  height: 25px;
  line-height: 25px;
  text-indent: 10px;
  cursor: pointer;
}

.menu:hover {
  color: deeppink;
  text-decoration: underline;
}
</style>
