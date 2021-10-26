const iconsList = [
    {
        name: 'cat',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'crow',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'dog',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'dove',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'dragon',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'horse',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'hippo',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'fish',
        prefix: 'fa-',
        type: 'animal',
        family: 'fas'
    },
    {
        name: 'carrot',
        prefix: 'fa-',
        type: 'vegetable',
        family: 'fas'
    },
    {
        name: 'apple-alt',
        prefix: 'fa-',
        type: 'vegetable',
        family: 'fas'
    },
    {
        name: 'lemon',
        prefix: 'fa-',
        type: 'vegetable',
        family: 'fas'
    },
    {
        name: 'pepper-hot',
        prefix: 'fa-',
        type: 'vegetable',
        family: 'fas'
    },
    {
        name: 'user-astronaut',
        prefix: 'fa-',
        type: 'user',
        family: 'fas'
    },
    {
        name: 'user-graduate',
        prefix: 'fa-',
        type: 'user',
        family: 'fas'
    },
    {
        name: 'user-ninja',
        prefix: 'fa-',
        type: 'user',
        family: 'fas'
    },
    {
        name: 'user-secret',
        prefix: 'fa-',
        type: 'user',
        family: 'fas'
    }
];

const colorsMap = {
    animal: "blue",
    vegetable: "orange",
    user: "purple"
};

const cardContainer = document.querySelector(".card-container");
const filterSelect = document.getElementById("filter_select");

const groupsList = groupByType(iconsList);
const categoryNamesList = getCategoriesNameList(groupsList);
console.log(groupsList);
console.log(categoryNamesList);
console.log(iconsList)

fillFilterSelectOptions(categoryNamesList);

printSingleCategory(iconsList);

function groupByType(iconsList) {
    const groupsList = {};

    for (let i = 0; i < iconsList.length; i++) {
        const { type } = iconsList[i];

        if (!groupsList[type]) {
            groupsList[type] = [];
        }
        iconsList[i].color = colorsMap[type];

        groupsList[type].push({...iconsList[i]});
    }
    return groupsList;
}

function printSingleCategory(listToPrint) {
    console.log(listToPrint);

    for (let i = 0; i < listToPrint.length; i++) {
        /**
         * 
         * @type {{name: string, prefix: string, type: string, family: string, color: string}}
         * 
         */
        const icon = listToPrint[i];
        const { name, prefix, family, type, color } = icon;

        const column = document.createElement("div");
        column.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "shadow");

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-img-top");

        const iconImage = document.createElement("i");
        iconImage.classList.add(family, prefix + name);
        iconImage.style.color = color;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("p");
        cardTitle.classList.add("card-title", "text-center");
        cardTitle.textContent = name.toUpperCase();

        cardContainer.append(column);
        column.append(card);
        card.append(cardImage);
        card.append(cardBody);
        cardImage.append(iconImage);
        cardBody.append(cardTitle);
    }
}

function printMultipleCategories(categoriesToPrint) {
    cardContainer.innerHTML = "";

    for (let i = 0; i < categoriesToPrint.length; i++) {
        const category = categoriesToPrint[i];

        printSingleCategory(groupsList[category], category);
    }
}

function getCategoriesNameList(groupsList) {
    const categoryNamesList = [];

    for (const key in groupsList) {
        categoryNamesList.push(key);
    }
    return categoryNamesList;
}

function fillFilterSelectOptions(categoryNamesList) {
    for (let i = 0; i < categoryNamesList.length; i++) {
        const categoryName = categoryNamesList[i];
        
        const option = document.createElement("option");
        option.value = categoryName;
        option.textContent = categoryName.toUpperCase();

        filterSelect.append(option);
    }
}

filterSelect.addEventListener("change", function (e) {
    const toPrint = [];

    if(this.multiple){
       for (let i = 0; i < this.selectedOptions.length; i++) {
         const option = this.selectedOptions[i];
         
         toPrint.push(option.value)
       }
    }
  
    if (this.value === "") {
      printSingleCategory(iconsList);
    } else {
      printMultipleCategories(toPrint);
    }
});
  
