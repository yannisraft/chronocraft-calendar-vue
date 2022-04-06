import { Theme } from "../interfaces";

export class ThemeManager {
    //private themes: Theme[] = [];
    private themes: Theme[];

    constructor(_themes?: Theme[]) {
        this.themes = [];
        if(_themes) this.setThemes(_themes);
    }

    private preloadTheme = (href: string, name: string) => {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        link.setAttribute('id', "theme_"+name);
        link.setAttribute('disabled', '');
        document.head.appendChild(link);

        return new Promise((resolve, reject) => {
            link.onload = (e) => {
                let target = e.target as Element;
                
                resolve(false);
            };
            link.onerror = reject;
        });
    };

    private selectTheme = (name: string) => {
        let theme = this.themes.find(i => i.name === name);
        if (name && !theme) {
            throw new Error(`The theme '"${name}"' has not been defined as a theme.`);
        } else if (theme) {
            this.themes.forEach(item => {
                item.active = false;
                const themeLinkElement = document.getElementById("theme_"+item.name);
                if(themeLinkElement) themeLinkElement.setAttribute('disabled', '');
            });
            theme.active = true;
            const themeLinkElement = document.getElementById("theme_"+theme.name);
            if(themeLinkElement) themeLinkElement.removeAttribute('disabled');
        }        
    }

    setThemes = (_themes: Theme[]) => {
        if(_themes)
        {
            this.themes = _themes;
            this.themes.forEach(theme => {
                theme.active = false;
                this.preloadTheme(theme.link, theme.name);
            });
        }
    }
     
    add(name: string, href: string) { return this.preloadTheme(href, name).then(s => this.themes.push({name: name, link: href, enabled: true, active: false})) };
    set theme(name: string) { if(typeof name === 'string') this.selectTheme(name); };
    get theme(): string { 
        let found = this.themes.find(i => i.active === true) as Theme;
        return found ? found.name : ""; 
    };
}


/* export class ThemeManager {
    //private themes: Theme[] = [];
    private themes: Theme[];

    constructor(_themes: Theme[]) {
        this.themes = [];
        this.setThemes(_themes);
    }

    private preloadTheme = (href: string, name: string) => {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        link.setAttribute('id', "theme_"+name);
        link.setAttribute('disabled', '');
        document.head.appendChild(link);

        return new Promise((resolve, reject) => {
            link.onload = (e) => {
                let target = e.target as Element;
                
                resolve(false);
            };
            link.onerror = reject;
        });
    };

    private selectTheme = (name: string) => {
        let theme = this.themes.find(i => i.name === name);
        if (name && !theme) {
            throw new Error(`The theme '"${name}"' has not been defined as a theme.`);
        } else if (theme) {
            this.themes.forEach(item => {
                item.active = false;
                const themeLinkElement = document.getElementById("theme_"+item.name);
                if(themeLinkElement) themeLinkElement.setAttribute('disabled', '');
            });
            theme.active = true;
            const themeLinkElement = document.getElementById("theme_"+theme.name);
            if(themeLinkElement) themeLinkElement.removeAttribute('disabled');
        }        
    }

    setThemes = (_themes: Theme[]) => {
        if(_themes)
        {
            this.themes = _themes;
            this.themes.forEach(theme => {
                theme.active = false;
                this.preloadTheme(theme.link, theme.name);
            });
        }
    }
     
    add(name: string, href: string) { return this.preloadTheme(href, name).then(s => this.themes.push({name: name, link: href, enabled: true, active: false})) };
    set theme(name: string) { if(typeof name === 'string') this.selectTheme(name); };
    get theme(): string { 
        let found = this.themes.find(i => i.active === true) as Theme;
        return found ? found.name : ""; 
    };
} */