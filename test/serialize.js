const React = require('react')
const { serializeReactElement } = require('../lib')
const test = require('ava')

test('div', t => {
    const element = <div />

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {},
    })
})

test('div with number props', t => {
    const element = <div prop={42} />

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            prop: 42,
        },
    })
})

test('div with string props', t => {
    const element = <div prop="42" />

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            prop: '42',
        },
    })
})

test('div with one number child', t => {
    const element = <div>{1}</div>

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: 1,
        },
    })
})

test('div with one array number child', t => {
    const element = <div>{[1]}</div>

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: [1],
        },
    })
})

test('div with one string child', t => {
    const element = <div>Test</div>

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: 'Test',
        },
    })
})

test('div with one array child', t => {
    const element = <div>{['Test', 12]}</div>

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: ['Test', 12],
        },
    })
})

test('div with one element child', t => {
    const element = <div><span></span></div>

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: {
                type: 'span',
                props: {},
            },
        },
    })
})

test('div with one element child and props', t => {
    const element = (
        <div title="DIV">
            <span>
                {['Value: ', 42]}
            </span>
        </div>
    )

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            title: 'DIV',
            children: {
                type: 'span',
                props: {
                    children: ['Value: ', 42],
                },
            },
        },
    })
})

test('function component', t => {
    const Component = () => <span></span>

    const element = <Component />

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'span',
        props: {},
    })
})

test('function component with props', t => {
    const Component = ({ title }) => <span>{title}</span>

    const element = <Component title="Title" />

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'span',
        props: {
            children: 'Title',
        },
    })
})

test('function component with children', t => {
    const Component = ({ title, children }) => (
        <div>
            <span>{title}</span>
            {children}
        </div>
    )

    const element = (
        <Component title="Title">
            <p>Content</p>
        </Component>
    )

    const serialized = serializeReactElement(element)

    t.deepEqual(serialized, {
        type: 'div',
        props: {
            children: [
                {
                    type: 'span',
                    props: {
                        children: 'Title',
                    },
                },
                {
                    type: 'p',
                    props: {
                        children: 'Content',
                    },
                },
            ],
        },
    })
})
