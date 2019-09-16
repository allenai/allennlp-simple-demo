/* This is the script that you need to update */

// TODO: 1. Update the title
const title = "Coreference Resolution"

// TODO: 2. Update the description
const description = "This is a garbage model for coreference resolution..."

// TODO: 3. Update the inputs. The "name" will be the key in the JSON
//          that gets sent to your model, so make sure it's what the
//          backend is expecting.
const inputFields = [
    // TextArea
    {name: "document", label: "Document", type: "textarea"}
]

// TODO: 4. Update the drop-down examples + exampleField + exampleMaxLength.
//          If you don't want a drop-down, just make this list be empty.
const examples = [
   {document: "Paul Allen was born on January 21, 1953, in Seattle, Washington, to Kenneth Sam Allen and Edna Faye Allen. Allen attended Lakeside School, a private school in Seattle, where he befriended Bill Gates, two years younger, with whom he shared an enthusiasm for computers. Paul and Bill used a teletype terminal at their high school, Lakeside, to develop their programming skills on several time-sharing computer systems."},
   {document: "The legal pressures facing Michael Cohen are growing in a wide-ranging investigation of his personal business affairs and his work on behalf of his former client, President Trump.  In addition to his work for Mr. Trump, he pursued his own business interests, including ventures in real estate, personal loans and investments in taxi medallions."}
]

const exampleField = "document"  // Which field to show in the dropdown?

const exampleMaxLength = 50     // How many characters of it to show?


// TODO: 5. Update the output

// Function to take a list of clusters (each cluster being a list of [start, end] pairs)
// and create a nested structure in the case where some clusters are inside others.
// Implicitly assumes that such a well-formed hierarchy exists.
const nestClusters = (clusters) => {
    // Flatten to a single list [start, end, cluster_id]
    const flatClusters = clusters.flatMap((row, clusterId) => (
        row.map(([start, end]) => [start, end, clusterId])
    ))

    // and then sort them by (start, -end), so that if two clusters have the same start
    // the larger one comes first.
    flatClusters.sort((a, b) => a[0] == b[0] ? b[1] - a[1] : a[0] - b[0])

    // Now we want to handle the nesting; we'll nest into pairs (cluster, [children])
    const completedClusters = []

    const insert = (flatCluster, completedClusters) => {
        const [start, end, clusterId] = flatCluster

        for (let i = 0; i < completedClusters.length; i++) {
            const [cstart, cend, cclusterId, cchildren] = completedClusters[i]
            // If the flatCluster is a child of this one, insert it into this one's
            // children and return.
            if (cstart <= start && end <= cend) {
                insert(flatCluster, cchildren)
                return
            }
        }
        // otherwise add to the end of completedClusters.
        completedClusters.push([start, end, clusterId, []])
    }

    flatClusters.forEach(flatCluster => insert(flatCluster, completedClusters))

    return completedClusters
}

const COLORS = ['blue', 'green', 'red', 'purple', 'yellow', 'silver', 'aqua', 'fuchsia', 'lime', 'maroon', 'navy', 'olive', 'teal']

const ClusterSpan = styled.span`
    border: ${props => `1px solid ${props.color}`};
    margin: 5px;
    display: inline-flex;
`

const ClusterId = styled.span`
    background-color: ${props => props.color};
    color: white;
`

const ClusterText = styled.span`
    padding: 5px;
`

const Cluster = ({ clusterId, children }) => {
    const color = COLORS[clusterId] || 'black'

    return (
        <ClusterSpan color={color}>
            <ClusterId color={color}>{clusterId}</ClusterId>
            {children}
        </ClusterSpan>
    )
}

const output = (inputs, result) => {
    // 5a. Destructure JSON result and (optionally) rename to camelCase.
    //     You'll need to change this to reflect the fields / structure of
    //     your model's response.
    const { clusters, document: doc } = result

    // each nestedCluster is [start, end, clusterId, children]
    const nestedClusters = nestClusters(clusters)

    const render = (lo, hi, nestedClusters, outputs) => {
        // No more clusters, just render individual words
        if (!nestedClusters.length) {
            for (let i = lo; i <= hi; i++) {
                outputs.push(<ClusterText>{doc[i]}</ClusterText>)
            }
        } else {
            // Render the next cluster
            const nestedCluster = nestedClusters.shift()
            const [start, end, clusterId, children] = nestedCluster

            // add on start
            for (let i = lo; i < start; i++) {
                outputs.push(<ClusterText>{doc[i]}</ClusterText>)
            }

        const renderedChildren = render(start, end, children, [])
        outputs.push(<Cluster clusterId={clusterId}>{renderedChildren}</Cluster>)

        render(end + 1, hi, nestedClusters, outputs)
        }
    return outputs
}

    // 5b. And generate output based on the result.
    return (
       <Output>
            {render(0, doc.length - 1, nestedClusters, [])}
       </Output>
   )
}
