/* 进行适配整个屏幕高度，对左边的导航的路由表的内容进行自适应，对整个tableHeight的高度进行自适应 */ 
/*
	tab切换的高度40px(tab)-4
	搜索条件的高度60px(search)+3
	底部翻页的高度52px(page)
*/ 

// 在展示的区域中，什么都没有，定义为初始的高度()
var lookHeight = document.documentElement.clientHeight || document.body.clientHeight;
var lookWidth = document.documentElement.clientWidth || document.body.clientWidth;
var leftNavHeight = lookHeight - 60; 
// 在展示的区域中，只有一个tab切换(tab)
var tabHeight = lookHeight - 100; 
// 在展示的区域中，只有一个搜索条件(search)
var searchHeight = lookHeight - 120;
// 在展示的区域中，只有一个翻页工具(page)
var pageHeight = lookHeight - 112;
// 在展示的区域中，一个tab切换、一个搜索条件(tab-search)
var tabSearchHeight = lookHeight - 162;
// 在展示的区域中，一个tab切换、一个翻页工具(tab-page)
var tabPageHeight = lookHeight - 152;
// 在展示的区域中，一个搜索条件、一个翻页工具(search-page)
var searchPageHeight = lookHeight - 173; //处理减去相应的火狐的兼容多减去1px
// 在展示的区域中，一个tab切换、一个搜索条件、一个翻页工具(tab-search-page)
var tabSearchPageHeight = lookHeight - 214; 