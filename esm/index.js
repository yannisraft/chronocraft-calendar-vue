import 'vue';
import { s as script } from './HelloWorld-9ea2c703.js';
import { r as registerComponent } from './index-37e0eef4.js';
import { s as script$1 } from './TestWorld-2ce79e86.js';

const Plugin = {
    install(vue) {
        registerComponent(vue, script);
    }
};

const Plugin$1 = {
    install(vue) {
        registerComponent(vue, script$1);
    }
};

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  HelloWorld: Plugin,
  TestWorld: Plugin$1
});

const filterUtility = (payload, dataSource, filterStratergies) => {
    let tempData = [];
    Object.values(payload).forEach((config) => {
        const { filterKey, type, matchType } = config;
        tempData = tempData || dataSource[config.dataSource];
        const filterValue = config.value || [];
        if (type !== "key") {
            const isFunction = filterStratergies[filterValue];
            if (!isFunction)
                return;
            tempData = tempData.filter((item) => {
                return isFunction(item);
            });
        }
        tempData = tempData.filter((item) => {
            if (matchType === "exact") {
                return filterValue.includes(item[filterKey]);
            }
            if (matchType === "between_range") {
                const min = [];
                const max = [];
                config.options
                    .filter((opt) => filterValue.includes(opt.value))
                    .forEach((value) => {
                    min.push(value.startKey || 0);
                    max.push(value.endKey || 0);
                });
                return (item[filterKey] >= Math.min(...min) &&
                    item[filterKey] <= Math.max(...max));
            }
            if (matchType === "less_than") {
                return item[filterKey] < Math.max(...filterValue);
            }
            if (matchType === "less_than_or_equal") {
                return item[filterKey] <= Math.max(...filterValue);
            }
            if (matchType === "greater_than_or_equal") {
                return item[filterKey] >= Math.min(...filterValue);
            }
            if (matchType === "greater_than") {
                return item[filterKey] > Math.min(...filterValue);
            }
            return item[filterKey] === filterValue;
        });
    });
    return tempData;
};

const sortUtility = (sortConfig, dataSource, sortStratergies) => {
    const data = dataSource[sortConfig.dataSource];
    const { sortingKey, ordering, type } = sortConfig;
    if (type === "key") {
        return data.sort((a, b) => {
            const sortKey = sortingKey || "";
            return ordering === "ascending"
                ? a[sortKey] - b[sortKey]
                : b[sortKey] - a[sortKey];
        });
    }
    const { sortFunction = "" } = sortConfig;
    return sortStratergies[sortFunction](data);
};

const install = (instance) => {
    for (const componentKey in components) {
        instance.use(components[componentKey]);
    }
};

export default install;
export { Plugin as HelloWorld, Plugin$1 as TestWorld, filterUtility, sortUtility };
