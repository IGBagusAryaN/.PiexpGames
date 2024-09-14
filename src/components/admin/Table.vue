
<script setup>
import { ref, computed } from 'vue';
import debounce from 'lodash/debounce'; 

const props = defineProps({
  tables: {
    type: Array,
    required: true,
    default: () => [],
  },
  headers: {
    type: Array,
    required: true,
  },
});

const sortField = ref('');
const sortOrder = ref('asc');

const changeSort = debounce((field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
}, 200);

const compareValues = (a, b) => {
  if (a == null) return 1; 
  if (b == null) return -1;

 
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a - b; 
  } else {
    return String(a).localeCompare(String(b));
  }
};

const sortedTables = computed(() => {
  if (!sortField.value) return props.tables;

  return [...props.tables].sort((a, b) => {
    const fieldA = a[sortField.value];
    const fieldB = b[sortField.value];

    const result = compareValues(fieldA, fieldB);
    return sortOrder.value === 'asc' ? result : -result; 
  });
});

const handleInfo = (table) => {
  console.log('Info:', table);
};

const handleEdit = (table) => {
  console.log('Edit:', table); 
};

const handleDelete = (table) => {
  console.log('Delete:', table); 
};
</script>

<template>
  <div class="relative sm:rounded-lg">

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <!-- <th scope="col" class="p-4"></th> -->
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-6 py-3 cursor-pointer"
              @click="changeSort(header.field)"
            >
              {{ header.label }}
              <span v-if="sortField === header.field">
                <font-awesome-icon :icon="sortOrder === 'asc' ? ['fas', 'sort-up'] : ['fas', 'sort-down']" class="ml-2" />
              </span>
              <span v-else>
                <font-awesome-icon :icon="['fas', 'sort']" class="ml-2" />
              </span>
            </th>
            <!-- <th class="px-6 py-3">Action</th>  -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(table, rowIndex) in sortedTables" :key="rowIndex" class="bg-white border-b hover:bg-gray-50">
            <!-- <td class="w-4 p-4">
              <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td> -->
            <td v-for="(value, key) in table" :key="key" class="px-6 py-4 max-w-xs truncate">
              {{ value }}
            </td>
            <!-- <td class="px-6 py-4">
              <button @click="handleEdit(table)" class="text-green-600 hover:underline mr-2"><font-awesome-icon :icon="['fas', 'pen']" /></button>
              <button @click="handleDelete(table)" class="text-red-600 hover:underline mr-2"><font-awesome-icon :icon="['fas', 'trash']" /></button>
              <button @click="handleInfo(table)" class="text-blue-600 hover:underline"><font-awesome-icon :icon="['fas', 'circle-info']" /></button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

