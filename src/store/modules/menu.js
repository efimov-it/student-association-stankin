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
                            setTimeout(()=> {
                                commit('addMenuItems', newMenuItems);
                            }, 2000);
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