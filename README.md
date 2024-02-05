<p align="center">
  <img src="https://github.com/Cy4Shot/ICHack2024/blob/master/banner.png?raw=true">
</p>

<p align="center">
<strong>map.it!</strong> is a tool for aspiring entrepreneurs to find the perfect location to open their business. We use a wide variety of financial data to calculate a projected profit for your company and neatly visualize it with an interactive heatmap.
</p>

<p align="center">
  <img src="https://github.com/Cy4Shot/ICHack2024/blob/master/disclaimer.png?raw=true">
</p>

## Inspiration
When we first started hacking, our idea had always been trying to empower people's financial decisions. Fortunately, Citadel had a prompt that resonated with us. We believe that with proper understanding of financial data, we can help people make informed financial decisions. Compared to bigger firms, small business owners or potential business owners do not have the resources to make well-informed decisions consistently. We want to focus on helping small business owners obtain insight on where to build their company that could potentially completely change many lives for the better.
 
## What it does
Our product, map.it! utilises consumers' data fetched from Google's API as well as an economic model to determine if a person's business is feasible in a give time-frame. Alongside, map.it! visualises customer segment growth potential, rent, and public transportation data that further supports user on finding the best location to start their business.

<p align="center">
  <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/752/194/datas/gallery.jpg">
</p>

## How we built it
We use Google Maps API inside a react web application to display heatmaps to the user. To estimate the profit of a company we use a profitability index, calculated based off the user's financial information, further data from Google's API as well as the current inflation rate. To generate a digestible summary for inexperienced users, we take advantage of OpenAI's GPT-4 natural language model.

## Challenges we ran into
We ran into challenges collecting data for processing. After searching for databases online, we decided to generate an approximation of real-world information based on multiple pre-existing datasets, such as the Google Maps API and ONS figures.

## Accomplishments that we're proud of
We're extremely proud to present a modern, user-friendly solution to breaking the stigma behind founding a business and unduly high barriers to entry in some industries. We are particulary happy with the accuracy to which we managed to predict the profitability index given our limited supply of data, as well as the presenting the data with a heatmap to aid visualization.

## What we learned
We learned that data plays a significant part of our lives that we can predict consumerism simply using publicly available data. This further interested us to learn and harness the power of data.

## What's next for map.it
We're interested in collecting more accurate data to improve our models, as well as develop our toolset available to users. By using a datacenter, we would be able to scale up our project to meet global needs.
