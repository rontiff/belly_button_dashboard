// function to build both charts




function buildCharts(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      const samples = data.samples; // Get the samples field
      const result=samples.find(item=>item.id===sample); // Filter the samples for the object with the desired sample number
      const otu_ids=result.otu_ids; // Array of OTU IDs
      const otu_labels=result.otu_labels; // Array of OTU labels
      const sample_values=result.sample_values; // Array of Sample values
  
      // Build a Bubble Chart
      
      const bubbleData= [{
        x:otu_ids,
        y:sample_values,
        text:otu_labels,
        mode:'markers',
        marker: {
          size:sample_values,
          color:otu_ids,
          colorscale:"Earth"
        }
      }]; //Build bubblechart data
  
      const bubbleLayout={
        title: "Bacteria Cultures Per Sample",
        hovermode:"closest",
        xaxis:{title:"OTU ID"},
        yaxix:{title:"Number of Bacteria"}
      };
      // Render the Bubble Chart
      Plotly.newPlot("bubble",bubbleData,bubbleLayout);
  
      // Build a Bar Chart
      const yticks=otu_ids.slice(0,10).map(otuID=>`OTU ${otuID}`).reverse() //map the otu_ids to a list of strings for your yticks
      // Bar chart data
      const barData =[{
        type:'bar',
        y:yticks,
        x:sample_values.slice(0,10).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
  
      const barLayout={
        title: "Top 10 Bacteria Cultures Found",
        xaxis:{title:'Number of Bacteria'},
        hovermode:"closest",
        margin:{t:30, l:150}
      };
  
      // Render the Bar Chart
      Plotly.newPlot("bar",barData,barLayout)
    });
  }