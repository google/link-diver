# Link Diver
 
Link Diver is a chrome extension to speed up understanding the links that can be extracted from web pages, which is a complicated task in modern websites that make heavy use of anchoring and javascript in a sophisticated layout. The main goal is to make it easier for a human to “dive” into web sites just like a web crawler. This should greatly help to efficiently identify patterns in outlinks, problematic URLs, and in general the path that a hypothetical web spider would follow through a website.
 
## Installation Instructions
 
For installation instruction please refer to the latest release which can be found [here](https://github.com/google/link-diver/releases):
 
## User Manual
 
Once you have installed the extension onto chrome you are ready to start diving into web pages! Once on a page that you would link to explore, click on the extension icon in the top right corner of Chrome, or right click anywhere on the page and select the link diver context menu item. A tab will open in a new window with a list of all of the links on the page you were previously on. With the extension now open you can view metadata for each link, filter the links by a variety of options, group the links by various metadata attributes, sort the links, and highlight links that you would like to investigate more thoroughly on the original web page.
 
### Metadata
 
In addition to viewing all of the links available on a page, you can expand each link to see associated metadata about that particular link. To expand a link click on the triangle to the left of the link, or on any other part of the link's box that is not the link itself. You can also expand and collapse each link at once with the 'Expand All' and 'Collapse All' buttons. The following are metadata that will appear upon expanding a link:
 
- **Host** (The host of the web page being linked)
- **Visible** (Whether or not the link is visible on the original page)
- **Tag Source** (The type of tag that the link was found under. For example, 'A' for a typical link, 'IMG' for an image, etc.)
- **Content Type** (The content type of the http response of the request sent to that link)
- **Status Code** (The status code of the http response)
 
### Fetching HTTP Status Codes
 
On top of displaying each link to you, the Link Diver will send http get requests and display the status code and content type of the response for each link that it collects. Please note that to not overburden the network, these results will come in in batches. Because of this the status code and content type attributes may take a while to appear for every link. If a link has not received a response yet it will simply not display a status code or content type.
 
### Filtering
 
Link Diver will also filter links for you based on a regular expression you provide or by some of the metadata mentioned earlier.
 
If you are only interested in filtering by a regular expression, simply write your expression into the textbox at the top of the page and press enter. Link Diver will then only display to you links that contain that regular expression somewhere in the link and will highlight the matches in red for each link. If however you want to filter in combination with other parameters, you will have to use the regexp modifier, like so:
> regexp:^https://www[.]google[.]com
 
To filter links by one of (or a combination of) their metadata attributes, you can use a similar format. Each metadata attribute has it's own modifier which are listed below. Simply write the modifier of the metadata attribute you want to filter by, followed by a comma and the value you want. For example if I wanted to filter for links coming from an anchor tag, I would type:
> tag:A

To use a combination of these filtering arguments simply seperate the arguments with a space. For example to filter for links that are not visible and had a successful status code in combination with a regular expression you could do:
> regexp:^https://www[.]google[.]com visible:false status_ok:true
 
The following are all of the modifieres you can use to filter:
 
- regexp (Regular Expression)
- host (Host)
- visible (Visible)
- tag (Tag Source)
- content_type (Content Type)
- status_code (Status Code)
- status_ok (Whether or not the status code is indicative of a succes or an error)
 
Please note that to filter by host uses a regular expression to match your input to the links' host, so you do not have to write out the full host.

Similarly filter by content_type will filter for any links that contain the value you supply, so again you don't have to write out the full content type. Therefore if you wanted to filter for links with content type of image you could do:
> content_type:image

But if you only wanted png images you could write out the full content type instead:
> content_type:image/png

### Negation

In addition to filtering for all of the criteria listed above, you can alos filter for links that don't match a given critera. To do this simply prepend the 'not:' modifier in front of the filtering argument. For example to filter for links that do not come from an anchor tag, input the following:
> not:tag:a

As another example to filter for links that do not contain a match for the regular expression 'github[.]com', you would input:
> not:regexp:github[.]com
 
### Grouping
 
In addition to filtering, you can also have Link Diver group the links by one of the metadata attributes mentioned in the Filtering section. To group, wrap the attribute you want to group by with brackets and make sure to put spaces inbetween the brackets and the key. For example to group by host and filter for 200 status code, you would input:
> status_code:200 { host }
 
In addition to the aforementioned metadata attributes you could also group by url if you wanted duplicate URLs to be grouped together.

Below is a list of all the keys you can use to group the links by.

- url
- host
- visible
- tag
- status_code
- status_ok
- content_type
 
Similarly to how you can collapse and expand individual links, you can also collapse and expand groups by clicking anywhere on the blue group header.
 
### Sorting
 
To sort the links click on the 'Sort By:' drop down menu and select the sorting criteria you would like. By default links appear in the order they are found traversing the DOM.
 
### Refreshing Links
 
If for whatever reason the contents of the original page have changed since you opened the page, you can refresh the links in the additional settings menu without starting a new instance of the extension. To do this, simply click the three dots under the filter button and select the refresh option. This will start the link extraction process from scratch based on whatever is now on the page you used to originally launch the extension.
 
### Viewing HTML Element Source
 
If the provided metadata is not sufficient for your needs, you can toggle the Show DOM Element Source option to view the entire source code for the DOM element corresponding to each individual link. This option is also in the additional settings menu which can be accessed by clicking the three dots below the filter button. When turned on the source code will display below a link's metadata if the link is expanded.
 
### Highlighting
 
Last but not least, Link Diver has the ability to highlight and scroll to links on the original page so you can easily locate them within the web page. To highlight a link use the highlight icon on the right hand side of the page. When a link is successfully highlighted the highlight icon will turn yellow, at which point you can turn the highlight off by clicking the icon again.
 
This feature is highly experimental, we invite your feedback on this, but please be aware that this is not capable of making links that are marked as not visible appear on the page; it can only scroll to links that are already visible. Even then, sometimes the link is not truly visible and might not appear as highlighted on the original page.
 
Additionally, please note that this feature might not work exactly as expected if you are highlighting the same page with multiple instances of the extension, as instructions from the two instances could conflict.

*This is not an officially supported Google product*
 