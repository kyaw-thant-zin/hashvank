const fs = require('fs')
const css = require('css')

const getJSCode = (params, callBack) => {

    const cssText = fs.readFileSync(__dirname+'/Hushvank.css', 'utf8')
    const obj = css.parse(cssText)
    const result = css.stringify(obj)

    const defaultApiSetting = params.apiSetting
    const defaultLayoutSetting = defaultApiSetting.layoutContent

    

    let videoViews = []
    if(params.tiktokInfos.length > 0) {
        params.tiktokInfos.forEach(element => {
            if(callBack && callBack === 'parseArray') {
                videoViews.push(element.videoUrl)
            } else {

                const linkSettings = element.linkSettings
                let linkSettingsArray = []

                if(linkSettings.length > 0) {
                    linkSettings.forEach(ele => {
                        linkSettingsArray.push(`
                            <li class="hushvank-vd-wr-info-list-item">
                                <a href="${ele.pageUrl}" target="_blank" rel="noopener">
                                    <figure>
                                        <img src="${ele.imageUrl}" alt="${ele.title}" />
                                    </figure>
                                    <div class="hushvank-vd-wr-info-list-item-txt">
                                        <h3>${ele.title}</h3>
                                        <p>${ele.hashtag}</p>
                                    </div>
                                </a>
                            </li>
                        `)
                    })
                }

                videoViews.push(`
                                    <div class="hushvank-vd-wr">
                                        <video autoplay muted loop onclick="showItem(this)"><source type="video/mp4" src="${element.videoUrl}" /></video>
                                        <div class="hushvank-vd-wr-info">
                                            <ul class="hushvank-vd-wr-info-list">
                                                ${linkSettingsArray.join('')}
                                            </ul>
                                        </div>
                                    </div>
                            `)
            }
        });
    }

    if(videoViews.length === 0) {
        return null
    }

    let jsCodes = `
        const defaultSetting = {
            layoutType: ${defaultApiSetting.layoutType},
            layoutWrapper: document.querySelector('#hushvank'),
        };
        let videoViewsArray = ${JSON.stringify(videoViews)}; 
        function parseHTML() {
            if(typeof hushvank != "undefined") {

                if('layoutType' in hushvank) {
                    videoViewsArray = videoViewsArray.slice( 0, hushvank.layoutType)
                } else {
                    videoViewsArray = videoViewsArray.slice( 0, defaultSetting.layoutType)
                }
    
                if('layoutWrapper' in hushvank) {
                    hushvank.layoutWrapper.innerHTML = '<div class="hushvank-vd">'+videoViewsArray.join(' ')+'</div>'; 
                } else {
                    defaultSetting.layoutWrapper.innerHTML = '<div  class="hushvank-vd">'+videoViewsArray.join(' ')+'</div>'; 
                }
    
            } else {
                
            }
        }
        function parseArray() {
            if(typeof hushvank != "undefined") {

                if('layoutType' in hushvank) {
                    videoViewsArray = videoViewsArray.slice( 0, hushvank.layoutType)
                } else {
                    videoViewsArray = videoViewsArray.slice( 0, defaultSetting.layoutType)
                }
                
                Hushvank.response = videoViewsArray;
    
            } else {
                
            }
        }
        function showItem(vd) {
            if(vd.nextElementSibling.classList.contains('active')) {
                vd.nextElementSibling.classList.remove('active');
            } else {
                vd.nextElementSibling.classList.add('active');
            }
        }
        
    `

    if(callBack && callBack === 'parseArray') {
        jsCodes += `parseArray();`
    } else {
        jsCodes += `parseHTML();`
    }

    jsCodes += `
        const styleTag = document.createElement("style");
        styleTag.innerHTML = ${JSON.stringify(result)};
        document.querySelector("head").appendChild(styleTag);
    `

    return jsCodes
    
}


module.exports = {
    getJSCode,
}