export const settings = {
    templates: {
        type: 'string',
        description: 'comma seperated list of URL templates'
    }
};

function formatUrl(format, term) {
    return format.replace('{}', encodeURIComponent(term));;
}

export const fn = ({
    term,
    display,
    actions,
    settings
}) => {

    const search = (url) => {
        actions.open(url);
        actions.hideWindow();
    };

    const templates = settings.templates.split(',')
        .map(template => {
            const [key, format] = template.split('|');
            return {
                key,
                format
            };
        })
        .filter(({
            key
        }) => term.startsWith(key))
        .map(({
            key,
            format
        }) => {
            return {
                key,
                format,
                url: `${formatUrl(format, term.replace(key, '').trim())}`
            };
        });

    templates.forEach(({
        key,
        format,
        url
    }) => {

        display({
            title: `Search ${key} for ${term.replace(key, '').trim()}`,
            subtitle: `${url}`,
            onSelect: () => search(url)
        });

    });

};
