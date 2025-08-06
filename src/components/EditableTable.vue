

<script>
export default {
  props: {
    years: {
      type: Number,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    dataColumns() {
      if (!this.columns) return []
      return this.columns;
    },
    yearArray() {
      return Array.from({ length: this.years }, (_, i) => i + 1);
    },
  },
  methods: {
    getCellValue(rowIndex, colIndex) {
      const column = this.dataColumns[colIndex];
      return column[rowIndex] || "0";
    },
    handleInput(rowIndex, colIndex, event) {
      const value = event.target.innerText.trim();
      this.$emit("update-column", { rowIndex, colIndex, value });

      // Recalculate Economic Return if relevant columns are updated
      if (colIndex === 1 || colIndex === 2) {
        const orgRevenue = parseFloat(this.orgRevenues[rowIndex] || "0");
        const fineAvoidance = parseFloat(this.fineAvoidanceValues[rowIndex] || "0");
        const economicReturn = orgRevenue * (fineAvoidance / 100);
        this.$emit("update-column", {
          rowIndex,
          colIndex: 3, // Economic Return column
          value: economicReturn.toFixed(2),
        });
      }
    },
    highlightCell(event) {
      event.target.style.backgroundColor = "#F4FFF4";
    },
    unhighlightCell(event) {
      event.target.style.backgroundColor = "#fff";
    },
  },
};
</script>

<template>
  <div id="editableTableContainer" class="editable-table-container">
    <table id="editableDataTable">
      <thead>
        <tr>
          <th>Year</th>
          <th>Cost for Capabilities</th>
          <th>Organizational Revenue</th>
          <th>Fine Avoidance Value</th>
          <th>Economic Return</th>
          <th>Reputational Returns</th>
          <th>Returns on Capabilities</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(year, index) in yearArray" :key="index">
          <td class="year-column" style="background-color: #f4f4f4;">{{ index + 1 }}</td>
          <td
            v-for="(column, colIndex) in dataColumns"
            :key="colIndex"
            :contenteditable="colIndex !== 3"
            :class='[colIndex === 3 && "disabled-cell"]'
            @input="handleInput(index, colIndex, $event)"
            @mouseover="highlightCell($event)"
            @mouseout="unhighlightCell($event)"
          >
            {{ getCellValue(index, colIndex) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.editable-table-container {
  max-height: 400px;
  overflow-y: auto;
  display: block;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.year-column {
  background-color: #f4f4f4;
}

/* Ensure table header is fixed and body scrolls */
#editableTableContainer {
    max-height: 407px;
    /* Set this to your desired height */
    overflow-y: auto;
    /* Allow vertical scrolling */
    overflow-x: hidden;
    /* Prevent horizontal scrolling */
    position: relative;
    width: 100%;
}

#editableTableContainer table {
    width: 100%;
    /* Ensure the table takes up full container width */
    /* border: 2px solid #333; */
    border: 1px solid rgba(15, 124, 65, 0.5);
    border-collapse: collapse;
    table-layout: fixed;
    /* Ensures the table layout stays within the container */
}

#editableTableContainer thead th {
    position: sticky;
    top: 0px;
    font-weight: 500;
    /* background-color: #85c185; */
    /* background-color: #0F7C41; */
    background-color: #EDF2FA;
    /* background-color: #f4f4f4; */
    /* background-color: #0c6201; */
    /* background-color: #b8e1cb; */
    /* background-color: #658a56; */
    color:black;
    z-index: 1;
    border-bottom: 1px solid #d4d4d4;
    padding: 2px;
    text-align: center;
    /* Center-align the header titles */
    white-space: normal;
    /* Allow header text to wrap onto two lines */
}
#editableTableContainer th,
#editableTableContainer td {
    /* margin-top:10px; */
    padding: 8px;
    text-align: left;
    /* Left-align or center the table content as needed */
    border-bottom: 1px solid #d4d4d4;
    overflow: hidden;
    /* Ensures no horizontal scroll */
    text-overflow: ellipsis;
    /* Adds ellipsis (...) to truncated text */
}

#editableTableContainer tbody {
    top: -40px;
    overflow-y: auto;
}

#editableTableContainer tbody td {
    text-align: center;
    /* Center-align cell values */
    vertical-align: middle;
    /* Vertically center the content */
}

.disabled-cell {
  background-color: #f4f4f4 !important;
  cursor: not-allowed;
}
</style>