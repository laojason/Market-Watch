import Fuse from 'fuse.js';
//pulled from react-select-search library
export default function fuzzySearch(options) {
    const fuse = new Fuse(options, {
        keys: ["name", "value"],
        threshold: 0.3,
    });

    return (value) => {
        if (!value.length) {
            return options;
        }
        return fuse.search(value);
    };
}