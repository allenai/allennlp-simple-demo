/* This is the script that you need to update */

// TODO: 1. Update the title
const title = "Textual Entailment"

// TODO: 2. Update the description
const description = "This is a junky model for textual entailment.."

// TODO: 3. Update the inputs. The "name" will be the key in the JSON
//          that gets sent to your model, so make sure it's what the
//          backend is expecting.
const inputFields = [
    {name: "premise", label: "Premise", type: "text"},
    {name: "hypothesis", label: "Hypothesis", type: "text"},
]

// TODO: 4. Update the drop-down examples + exampleField + exampleMaxLength.
//          If you don't want a drop-down, just make this list be empty.
const examples = [
   {premise: "An elephant is walking near a river.",
    hypothesis: "The elephant is gray."},
    {premise: "If you help the needy, God will reward you.",
    hypothesis: "Giving to the poor has good consequences."},
]

const exampleField = "premise"  // Which field to show in the dropdown?

const exampleMaxLength = 50     // How many characters of it to show?


// TODO: 5. Update the output
const LABELS = ["Entailment", "Neutral", "Contradiction"]

const output = (inputs, result) => {
    // 5a. Destructure JSON result and (optionally) rename to camelCase.
    //     You'll need to change this to reflect the fields / structure of
    //     your model's response.

    const { label_probs: labelProbs } = result

    const predictionRows = labelProbs.map((probability, idx) => (
        <tr>
            <td>{LABELS[idx]}</td>
            <td>{`${(probability * 100).toFixed(1)}%`}</td>
        </tr>
   ))

    // 5b. And generate output based on the result.
    return (
        <Output>
            <table>
                <tr>
                    <th>Label</th>
                    <th>Probability</th>
                </tr>
                {predictionRows}
            </table>
        </Output>
    )
}
