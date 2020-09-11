//Using jquery for disselecting button on click elsewhere
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarButton").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 990) {
      $("#navbarMenus").collapse('hide');
    }
  });
});

(function(global){
    console.log('hi');
  var dc = {};

  var homePage = "Snippets/main.html"
  var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
  var categoriesTitleHtml = 'Snippets/categoriesTitleSnippet.html';
  var categoryHtml = 'Snippets/categorySnippet.html';


 var insertHtml = function(html,selector){
   var selectedTag = document.querySelector(selector);
   selectedTag.innerHTML = html;
 }

var showLoading = function(selector){
  var html = "<div class='text-center'>"
  html+= "<img src='Images/ajax-loader.gif'></div>";
  insertHtml(html,selector);
}

var insertProperty = function(string,propName,propValue){
  var propToReplace = "{{" + propName + "}}";
  var string = string.replace(new RegExp(propToReplace, 'g'), propValue);
  return string;
}

dc.loadMenuCategories = function(){
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

function buildAndShowCategoriesHTML(categories){
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function(categoriesTitleHtml){
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function(categoryHtml){
          var categoriesViewHtml = buildCategoriesPage(
            categories,
            categoriesTitleHtml,
            categoryHtml
          );
          insertHtml(categoriesViewHtml,'#main-content');
        },false
      )
    },false
  );
};
var buildCategoriesPage = function(categories, categoriesTitleHtml, categoryHtml){
  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";
  for(i=0;i<categories.length;i++){
    var html = categoryHtml;
    var short_name = categories[i].short_name;
    var name = categories[i].name;
    html = insertProperty(html,"short_name", short_name);
    html = insertProperty(html,"name",name);
    finalHtml += html;
  }
  finalHtml += "</section>"
  return finalHtml;
}

document.addEventListener("DOMContentLoaded",function(){
  showLoading("#main-content");
  console.log('hi');
  $ajaxUtils.sendGetRequest(
    homePage,
    function(responseText){
      insertHtml(responseText,"#main-content");
    },
    false
  );
});



  global.$dc = dc;
})(window);
