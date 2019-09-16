
/* This is the script that you need to update */

// TODO: 1. Update the title
const title = "Reading Comprehension"

// TODO: 2. Update the description
const description = "This is the BiDAF model.."

// TODO: 3. Update the inputs. The "name" will be the key in the JSON
//          that gets sent to your model, so make sure it's what the
//          backend is expecting.
const inputFields = [
    // TextArea
    {name: "passage", label: "Passage", type: "textarea"},
    // TextField
    {name: "question", label: "Question", type: "text"},
    // Checkbox
    {name: "try-hard", label: "Try Hard", type: "checkbox",
    defaultValue: true},
    // Radio Buttons
    {name: "model", label: "Model", type: "radio",
    defaultValue: "fake",
    choices: ["real", "fake"], choiceLabels: ["Real", "Fake"]}
]

// TODO: 4. Update the drop-down examples + exampleField + exampleMaxLength.
//          If you don't want a drop-down, just make this list be empty.
const examples = [
   {passage: "The Matrix is a 1999 movie starring Keanu Reeves.",
    question: "Who starred in the Matrix?"},
   {passage: "AllenNLP is a library developed at AI2 in Seattle.",
    question: "Who develops AllenNLP?"}
]

const exampleField = "passage"  // Which field to show in the dropdown?

const exampleMaxLength = 50     // How many characters of it to show?


// TODO: 5. Update the output
const TokenSpan = styled.span`
    background: ${props => props.highlighted ? "palevioletred" : "white"}
    padding: 2px;
`

const HighlightedParagraph = ({tokens, highlight}) => {
    const [start, end] = highlight

    const paragraphToken = (token, idx) => {
        const highlighted = start <= idx && idx <= end
        return <TokenSpan highlighted={highlighted}>{token}</TokenSpan>
    }

    const paragraphTokens = tokens.map(paragraphToken)

    return <div className="highlighted-paragraph">{paragraphTokens}</div>
}

const Output = ({ result }) => {
   // 5a. Destructure JSON result and (optionally) rename to camelCase.
   //     You'll need to change this to reflect the fields / structure of
   //     your model's response.
   const {
       passage_tokens: passageTokens,
       best_span: bestSpan,
       best_span_str: bestSpanStr,
       passage_question_attention: attention,
       question_tokens: question_tokens
   } = result

   // 5b. And generate output based on the result.
   return (
       <div>
           <OutputItem label="Best Span:">
               <OutputText>{bestSpanStr}</OutputText>
            </OutputItem>

            <OutputItem label="Location in Passage:">
                <HighlightedParagraph tokens={passageTokens} highlight={bestSpan}/>
            </OutputItem>
       </div>
   )
}
