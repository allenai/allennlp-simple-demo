/* This is the script that you need to update */

// TODO: 1. Update the title
const title = "Named Entity Recognition"

// TODO: 2. Update the description
const description = "This is a garbage model for NER..."

// TODO: 3. Update the inputs. The "name" will be the key in the JSON
//          that gets sent to your model, so make sure it's what the
//          backend is expecting.
const inputFields = [
    // TextArea
    {name: "sentence", label: "Sentence", type: "text"}
]

// TODO: 4. Update the drop-down examples + exampleField + exampleMaxLength.
//          If you don't want a drop-down, just make this list be empty.
const examples = [
   {sentence: "If you like Paul McCartney, you should hear the first Wings album."},
   {sentence: "Paul Allen was born on January 21, 1953, in Seattle, Washington, to Kenneth Sam Allen and Edna Faye Allen."},
]

const exampleField = "sentence"  // Which field to show in the dropdown?

const exampleMaxLength = 50     // How many characters of it to show?


// TODO: 5. Update the output

const COLORS = {'U-ORG': 'green', 'U-PER': 'red', 'U-LOC': 'yellow'}

const UntaggedWord = styled.span`
    margin: 5px;
    padding: 5px;
`

const PaddedWord = styled.span`
    padding: 5px;
`

const NerTag = styled.span`
    background-color: ${props => COLORS[props.tag]};
    color: white;
`

const _TaggedWord = ({ tag, children, className }) => (
    <span className={className}>
        <NerTag tag={tag}>{tag}</NerTag>
        <PaddedWord>{children}</PaddedWord>
    </span>
)

const TaggedWord = styled(_TaggedWord)`
    border: ${props => `2px solid ${COLORS[props.tag]}`};
    margin: 5px;
`

const Word = ({ tag, children }) => {
    if (tag === "O") {
        return <UntaggedWord>{children}</UntaggedWord>
    } else {
        return <TaggedWord tag={tag}>{children}</TaggedWord>
    }
}

const Output = ({ result }) => {
    // 5a. Destructure JSON result and (optionally) rename to camelCase.
    //     You'll need to change this to reflect the fields / structure of
    //     your model's response.
    const { words, tags } = result

    // 5b. And generate output based on the result.
    return (
        <div>
            {words.map((word, idx) => <Word tag={tags[idx]}>{word}</Word>)}
        </div>
    )
}
