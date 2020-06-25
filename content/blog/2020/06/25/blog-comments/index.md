---
title: "Blog Comments"
start_date: "2020-06-25T06:23:13Z"
date: "2020-06-25T09:15:00Z"
tags: ["blog", "github", "react"]
draft: false
comment_issue_id: 11
---

I <Link to="/blog/2020/06/21/hello-world/">recently started blogging</Link>, and initially, I wasn't sure whether or not I was going to allow comments on my blog. A <ExternalLink to="https://duckduckgo.com/?q=should+my+blog+have+comments">quick search</ExternalLink> suggests that there are plenty of arguments both for hosting comments and for avoiding hosting comments. With no clear consensus, how are you supposed to decide which option to go for?

One criterion that I definitely required, were I to host comments on my blog, was that they had to be high-quality and engaging with the content and other commenters. I had no desire to host some relegated spam-ridden permanent garbage fire. As such, I intend to curate my comment section, and I intend to ban any repeatedly disruptive commentators.

Because my web site is a statically generated one, and I wanted it to remain that way, I didn't want to have to host the comments myself. Some famous comment hosting solutions instantly came to mind: Disqus and Facebook. Were I a little less concerned with topics like user privacy and data security, I probably would've slapped a Disqus or Facebook comment section on here, and called it a day. But that was not good enough for me.

I had seen alternatives to comments on some blogs. <ExternalLink to="https://overreacted.io/">Dan Abramov</ExternalLink>, for instance, just puts a link at the bottom of his posts labeled "Discuss on Twitter" that searches Twitter for tweets containing a link back to the post. I briefly considered this solution, but I decided against it based on a few reasons. It's a bit _too_ detached for my tastes. The only way I'd know somebody had left a comment this way was if they mentioned me in their tweet, or if I went back and looked at those link searches myself to see if anything new had been posted since last time[^twitter-features]. Then there's the character limit. It's appropriate for what Twitter is, but I don't want that limit in my comment section. And finally, I'm not an avid Twitter user. I'm not even really an occasional, irregular Twitter user. So putting my blog engagement there wasn't right for me.

A while back I had come across a comment section somewhere that was hosted using GitHub issues. During my search for a comment section solution, this memory resurfaced. I searched <ExternalLink to="https://www.google.com/search?hl=en&q=github%20comments%20blog">"github comments blog"</ExternalLink>, which took me to <ExternalLink to="https://stackoverflow.com/questions/59096243/adding-comments-in-blog-posts-on-github-pages">this Stack Overflow question</ExternalLink>, which finally led me to <ExternalLink to="https://jekyllcodex.org/blog/gdpr-compliant-comment/">Jekyll Codex's "GDPR compliant comments"</ExternalLink>.

While I'm not using Jekyll to host my blog, nor am I using jQuery, this was close enough to my needs that I could easily adopt it to fit my needs. Here's how I did it.

I created a <ExternalLink to="https://github.com/alexschrod/website/blob/master/src/components/blogComments.js">BlogComments React component</ExternalLink> that takes two properties, `gitHubRepository`—the repository the comments are stored in (in my case `alexschrod/website`) and `issueId`—the id of the issue for the particular blog post. I created a couple of helper components as well; `BlogComment`, which is responsible for rendering each individual comment and `LastRefreshed` which shows how long ago the comment section was refreshed. To avoid quickly using up a user's GitHub API rate limit, comments are cached in local storage and only reloaded upon manual request. I've also implemented conditional requests, which are supposed to not count against the rate limit according to <ExternalLink to="https://developer.github.com/v3/#conditional-requests">their documentation</ExternalLink>:

> **Note**: Making a conditional request and receiving a 304 response does not count against your Rate Limit, so we encourage you to use it whenever possible.

Unfortunately, I'm observing that my rate limit count goes down even when using conditional requests, so I think there may be an issue with their documentation. I've sent a ticket to GitHub about this.

I updated my <ExternalLink to="https://github.com/alexschrod/website/blob/master/src/templates/blogPost.js">Blog Post template</ExternalLink> to render a comment section _if_ a blog post has an associated `comment_issue_id` in its frontmatter. That means that if I ever want to have a blog post without comments, I can simply leave out that field, and no comment section will exist.

Finally, I went to my <ExternalLink to="https://github.com/alexschrod/website/issues">website's issues page</ExternalLink> and created issues for hosting the existing blog post's comments, and then added the relevant `comment_issue_id` values to their frontmatter.

And that's fundamentally it! I think I'll be fairly happy with this setup. It should meet all my needs for a good comment section hosting solution.

[^twitter-features]: I'm sure there's some kind of feature on Twitter where you can get a timeline consisting entirely of tweets with links to your blog posts to make doing this easier than having to go back to all your old blog posts and manually check each one. And if there isn't, Twitter is lacking what would be a decent feature to have.
