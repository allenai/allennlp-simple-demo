/* This is the script that you need to update */

// TODO: 1. Update the title
const title = "Sentiment Analysis"

// TODO: 2. Update the description
const description = "This is a junky model for sentiment analysis."

// TODO: 3. Update the inputs. The "name" will be the key in the JSON
//          that gets sent to your model, so make sure it's what the
//          backend is expecting.
const inputFields = [
    {name: "sentence", label: "Sentence", type: "text"}
]

// TODO: 4. Update the drop-down examples + exampleField + exampleMaxLength.
//          If you don't want a drop-down, just make this list be empty.
const examples = [
   {sentence: "This is the best movie I've ever seen."},
   {sentence: "The tacos made me violently ill."}
]

const exampleField = "sentence"  // Which field to show in the dropdown?

const exampleMaxLength = 50     // How many characters of it to show?


// TODO: 5. Update the output
const LABELS = ["Negative", "Positive"]

const Output = ({ result }) => {
    // 5a. Destructure JSON result and (optionally) rename to camelCase.
    //     You'll need to change this to reflect the fields / structure of
    //     your model's response.

    const { probs } = result

    const predictionRows = probs.map((probability, idx) => (
        <tr>
            <td>{LABELS[idx]}</td>
            <td>{`${(probability * 100).toFixed(1)}%`}</td>
        </tr>
   ))

    // 5b. And generate output based on the result.
    return (
        <table>
            <tr>
                <th>Label</th>
                <th>Probability</th>
            </tr>
            {predictionRows}
        </table>
    )
}
