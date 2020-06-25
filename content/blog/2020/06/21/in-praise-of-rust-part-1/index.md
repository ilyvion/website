---
title: "In Praise of Rust: Part 1 — Introduction"
start_date: "2020-06-21T11:27:03Z"
date: "2020-06-21T17:44:00Z"
tags: ["rust", "praise-rust"]
draft: false
comment_issue_id: 10
---

_When I first started this post, I thought I would just go over how I encountered the Rust programming language and then discuss what makes it stand out from the crowd, but the post got very long very fast, so I've decided to split it up into multiple posts, and I'll leave this one just discussing my introduction to the language and some very high-level ways in which it differs from the crowd._

---

Not only do I love writing and designing software, both for a living and as a hobby, but I also enjoy _learning_ new things within the field of software development. While it's decidedly fun to learn new technologies that operate within a language you already know, such as learning ReactJS or AngularJS for use with JavaScript, there's nothing I enjoy more than discovering that there exists a whole other programming language that I don't know yet, but that clearly is worth knowing, and then spending the time and effort it takes learning it.

At no point was this love of learning a new language more apparent to me than when I discovered <ExternalLink to ="https://www.rust-lang.org/">Rust</ExternalLink>. The backstory of how I ended up discovering and wanting to learn Rust is a bit long and complicated[^backstory-details], but long story short—I really needed something enjoyable to take my mind off my circumstances when I had those few moments to myself and I decided to use that time to learn a new programming language. I settled on Rust mostly based on the fact that it had been in the top spot for most loved technology four years in a row on StackOverflow's Developer Survey (five years now in 2020), which indicated pretty clearly to me that there was something to be said for this language.

In the past I've bragged both to people I know and to colleagues (and even in job interviews) that I learn new technologies very rapidly. Rust is the first thing that has ever put a dent in my confidence for rapid learning. The best part, though? I needed that challenge! I _really enjoyed_ the difficulties I faced. I think I've become a much better software developer in general from the lessons I learned learning Rust, regardless of which language I'd use going forward.

Rust has bucked the trend of most modern programming languages, and does not support <ExternalLink to="https://en.wikipedia.org/wiki/Class-based_programming">class-based programming</ExternalLink>. Having worked in class-based programming languages more or less without pause for over a decade, it was quite the learning curve getting used to designing and writing code without the ubiquitous subclassing I was used to. Rust really gets you to appreciate composition over inheritance, if you weren't already appreciating it from having used something like ReactJS.

If you are a fellow Rustacean[^rustacean], I'm sure you know exactly what I'm going to bring up as the primary challenge I faced early on. Did you say "fighting with the borrow checker?" Congratulations! 🎉🎈 I plan on going into details about the borrow checker in a future installment of this series.

[^backstory-details]: Back in the summer of 2018, my wife and I had our firstborn child. While I don't feel like sharing intricate details about him or his predicament(s), suffice it to say that he basically did not sleep for more than 5–15 minutes at a time for his first 6 months of life, and for the next year after that, he would sleep _better_, but still wake up between 15-30 times every night. Severe sleep deprevation and an undue care burden over a period of nearly a year basically broke me, and I sank into a deep depression, from which I've still only scantly recovered. Maybe I'll write more about this experience some day.
[^rustacean]: The word users of Rust have chosen as their autonym.
