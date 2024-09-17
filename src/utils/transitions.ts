export interface TransitionNameArgs {
    elementId: string;
    pageSlug: string;
}

export type TransitionElementId = Pick<TransitionNameArgs, 'elementId'>;
export type TransitionPageSlug = Pick<TransitionNameArgs, 'pageSlug'>;

export const getTransitionName = ({ elementId, pageSlug }: TransitionNameArgs): string => `${elementId}-${pageSlug}`;

/** apply only slug, returns getTransitionNameFromElementId({elementId}) function */
export const setTransitionSlug =
    ({ pageSlug }: TransitionPageSlug) =>
    ({ elementId }: TransitionElementId) =>
        getTransitionName({ elementId, pageSlug });

export const TRANSITION_ELEMENT_IDS = {
    POST_CARD: {
        FEATURE_IMAGE: 'post-card-feature-image',
        TITLE: 'post-card-title',
        EXCERPT: 'post-card-excerpt',
        CATEGORY: 'post-card-category',
        AUTHOR: 'post-card-author',
    },
} as const;
