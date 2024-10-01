import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { isElement } from 'hast-util-is-element';

const rehypeImageZoom: Plugin<[], Root> = () => {
    return (tree: Root) => {
        visit(tree, 'element', (node, index, parent) => {
            if (isElement(node) && node.tagName === 'img' && isElement(parent)) {
                if (
                    // do not zoom links
                    parent.tagName !== 'a' &&
                    // do not zoom thumbnails in links
                    (parent.tagName !== 'div' ||
                        (Array.isArray(parent.properties?.className) &&
                            !parent.properties.className.includes('kg-bookmark-thumbnail') &&
                            !parent.properties.className.includes('kg-bookmark-metadata')))
                ) {
                    if (!node.properties) {
                        node.properties = {};
                    }
                    if (!node.properties.className) {
                        node.properties.className = ['simply-zoom medium-zoom-simply'];
                    } else if (Array.isArray(node.properties.className)) {
                        if (!node.properties.className.includes('simply-zoom medium-zoom-simply')) {
                            node.properties.className.push('simply-zoom medium-zoom-simply');
                        }
                    } else if (typeof node.properties.className === 'string') {
                        node.properties.className = [node.properties.className, 'simply-zoom medium-zoom-simply'];
                    }
                }
            }
        });
    };
};

export default rehypeImageZoom;
