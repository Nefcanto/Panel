const enTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

const enParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const enRichText = [

    {
        "type": "heading-one",
        "children": [
            {
                "text": enTitle
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": enParagraph
            }
        ]
    },
    {
        "type": "heading-two",
        "children": [
            {
                "text": enTitle
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": enParagraph
            }
        ]
    },
    {
        "type": "heading-three",
        "children": [
            {
                "text": enTitle
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": enParagraph
            }
        ]
    },
    {
        "type": "heading-four",
        "children": [
            {
                "text": enTitle
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": enParagraph
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": enParagraph
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": "bold text",
                "bold": true
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": "italic",
                "bold": true,
                "italic": true
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": "code",
                "code": true
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": "Paragraph after header 1",
            }
        ]
    },
    {
        "type": "block-quote",
        "children": [
            {
                "text": "quote"
            }
        ]
    },
    {
        "type": "numbered-list",
        "children": [
            {
                "type": "list-entity",
                "children": [
                    {
                        "text": "ordered list"
                    }
                ]
            },
            {
                "type": "list-entity",
                "children": [
                    {
                        "text": "second"
                    }
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": "something else"
            }
        ]
    },
    {
        "type": "bulleted-list",
        "children": [
            {
                "type": "list-entity",
                "children": [
                    {
                        "text": "unordered "
                    }
                ]
            },
            {
                "type": "list-entity",
                "children": [
                    {
                        "text": "second"
                    }
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "children": [
            {
                "text": ""
            }
        ]
    },
    {
        "alt": "Nice image, watch it",
        "children": [
            {
                "text": ""
            }
        ],
        "type": "image",
        "url": "https://holismdevelopment.blob.core.windows.net/user/00000000-0000-0000-0000-000000000000.webp"
    }
]

export default enRichText
