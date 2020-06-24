---
title: "Hello, Blogosphere World"
date: "2020-06-21T06:08:00Z"
tags: ["blog", "gatsby", "github", "react"]
comment_issue_id: 9
---

Hello, hello! Is there anybody out there?[^cliche] Welcome to the sparkling new blog!

### The story so far

I've had a website since at least 2004. It's gone through numerous changes over the years, as my software engineering skills and web technologies have evolved. My website has existed in its current form since July 2015, although it did receive a rather substantial facelift in April 2018[^react]. Before then, I had used a small selection of CMSes to host my content[^cms-details].

Before my website had its current form, it had a decent amount of content of varying quality and interest, but when I did the reset in 2015, I wanted to reduce the website to a landing page about my skills and contact information; a sort of virtual business card. As such, my website had nothing but the <Link to="/">main page</Link> for the longest time. In May 2019, I added the <Link to="/links">links page</Link>, which has been updated a few times since then, but that's been it.

I've been wanting to do more with my website for a while, but due to complicated personal reasons, I've been unable to satisfactorily pursue that goal. Until now.

### Currently

In recent weeks, I have been feeling inspired to begin blogging again. I've done blogging in the past, but those blog entries are most likely long gone for the most part[^wayback]. What finally got me to stop thinking about doing it and finally taking the plunge was reading <ExternalLink to="https://manishearth.github.io/blog/2018/08/26/why-i-enjoy-blogging/">Manish Goregaokar’s blog post titled "Why I Enjoy Blogging"</ExternalLink>. My takeaways from reading that blog post were:

1. Blogging can help your own understanding on the topics you write about.
2. It's a way to keep doing what you enjoy doing, but in a different "headspace":
   > I like programming a lot, but if programming was all I did, I’d get tired pretty quickly. […] But I still sometimes feel like doing programmery things in my spare time just … not programming. Turns out that blogging doesn’t tire me out the same way!
3. It's okay if you write about something that other people have already written about.

Great! So, with the goal of picking up blogging again firmly implanted, the next question was, "how do I add a blog to my website?" My website was already built on React, so my first thought was that I could probably relatively easily add a blog system on top of that. I'm a big fan of doing things myself, but I'm also a big fan of not reinventing the wheel when it's not necessary. In particular, the thought of having to manually maintain a list of blog posts, blog tags and an RSS file had me looking for something more than plain React. A little Googling later, and <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink> presented itself as the obvious path going forward, seeing how it's built on top of React, but also has a great system for compile-time generation of content. Converting my plain React website to one running on Gatsby took me about half a day; most of which was spent reading the tutorial and a smattering of documentation.

Another half of a day was spent setting up this blog. I based most of my code on the one from <ExternalLink to="https://markshust.com/">Mark Shust's website</ExternalLink>; although it seems that his was based on the <ExternalLink to="https://github.com/gatsbyjs/gatsby-starter-blog">Gatsby blog starter</ExternalLink>, so who knows if I wouldn't have had an easier time basing it off of that instead? 😅

I did make one change to Mark's setup though; because I wanted <ExternalLink to="https://www.gatsbyjs.org/docs/mdx/">MDX support</ExternalLink> for my blog posts, which lets you mix Markdown with React components.

If you want to see exactly how I did what I did, you're in luck! My <ExternalLink to="https://github.com/alexschrod/website">website in all its glory is publicly accessible on GitHub</ExternalLink> for anyone to inspect and learn from!

### Going forward

I don't intend on limiting myself regarding what to write about here, so upcoming posts will be covering whatever I feel like writing about. Still, my interests are mostly centered around software development, gaming and health and diet, and so I'd expect my blog posts to be, also.

[^cliche]: Oh good, a cliché for a start.
[^react]: Mostly because I had recently discovered and learned some React, and I wanted to use my newfound skills to improve my website.
[^cms-details]: Some were homemade, while others were among the <ExternalLink to="https://www.mediawiki.org/">familiar</ExternalLink> and <ExternalLink to="https://www.drupal.org/">popular</ExternalLink>. These were used with varying degrees of satisfaction and update frequency.
[^wayback]: Although who knows what the <ExternalLink to="https://web.archive.org/">Internet WayBack Machine</ExternalLink> may have saved deep in its bellows?
