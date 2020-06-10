export default {
    state: {
        name: '',
        description: '',
        siteDataIsReady: false
    },
    mutations: {
        setSiteData (state, data) {
            state.name = data.name;
            state.description = data.description;
            state.siteDataIsReady = true;
        },
        checkSiteData (state) {
            if ( localStorage.getItem('siteName') && localStorage.getItem('siteDescription') ) {
                state.name = localStorage.getItem('siteName');
                state.description = localStorage.getItem('siteDescription');
            }
            state.siteDataIsReady = true;
        }
    },
    getters: {
        getSiteName (state) {
            return state.name;
        },
        getSiteDescription (state) {
            return state.description;
        },
        getSiteDataReadyState (state) {
            return state.siteDataIsReady;
        },
        getSiteData (state) {
            return state;
        }
    },
    actions: {
        loadSiteData ({commit}) {
            global.sendRequest({
                url: '',
                resolve (resp) {
                    const data = {
                        name        : resp.name, 
                        description : resp.description.replace(/\s\s/g, '<br />')
                    };
                    localStorage.setItem('siteName', resp.name);
                    localStorage.setItem('siteDescription', resp.description.replace(/\s\s/g, '<br />'));
                    commit('setSiteData', data);
                },
                reject () {
                    commit('checkSiteData');
                }
            });
        }
    }
}