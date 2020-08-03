export default {
    state: {
        menuItems: {},
        currentPage: null
    },
    mutations: {
        addMenuItems (state, data) {
            state.menuItems = data;
        },
        setCurrentPage (state, data) {
            state.currentPage = data;
        }
    },
    actions: {
        getMenuItems ({commit}) {
            global.sendRequest({
                url: 'wp/v2/pages?per_page=100',
                resolve (resp) {
                    let newMenuItems = {};
                    resp.forEach((menuItem, index) => {
                        if (menuItem.parent == 0) {
                            global.sendRequest({
                                url: menuItem._links['wp:featuredmedia'][0].href,
                                resolve (imgData) {
                                    newMenuItems[menuItem.id] = {
                                        ...newMenuItems[menuItem.id],
                                        title: menuItem.title.rendered,
                                        image: imgData.guid.rendered,
                                        menuOrder: menuItem.menu_order,
                                        link: menuItem.content.rendered != "" ? "/page/"+menuItem.id: null
                                    };

                                    if (menuItem.title.rendered.toLowerCase().indexOf('новост') != -1) {
                                        global.sendRequest({
                                            url: 'wp/v2/categories',
                                            resolve (categories) {
                                                categories.forEach( category => {
                                                    if (category.parent == 0) {
                                                        if (category.name == "Uncategorized") {
                                                            newMenuItems[menuItem.id].childrens.push({
                                                                link: '/news/', 
                                                                title: 'Новости ассоциации'
                                                            });
                                                        }
                                                        else {
                                                            newMenuItems[menuItem.id].childrens.push({
                                                                id: category.id,
                                                                link: '/category/' + category.id,
                                                                title: category.name
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        })
                                    }
                                }
                            });
                        }
                        else {
                            if (!newMenuItems[menuItem.parent]) newMenuItems[menuItem.parent] = {};

                            if(newMenuItems[menuItem.parent].childrens) {
                                newMenuItems[menuItem.parent].childrens.push({
                                    id: menuItem.id,
                                    title: menuItem.title.rendered,
                                    link: "/page/"+menuItem.id
                                });
                            }
                            else {
                                newMenuItems[menuItem.parent].childrens = [{
                                    id: menuItem.id,
                                    title: menuItem.title.rendered,
                                    link: "/page/"+menuItem.id
                                }];
                            }
                        }
                        
                        if( index == resp.length - 1) {
                            commit('addMenuItems', newMenuItems);
                        }
                    });
                }
            })
        }
    },
    getters: {
        getMenuItems (state) {
            return state.menuItems;
        },
        getCurrentPage (state) {
            return state.currentPage;
        }
    }
}