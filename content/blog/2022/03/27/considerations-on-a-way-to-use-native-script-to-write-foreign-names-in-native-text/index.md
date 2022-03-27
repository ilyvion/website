---
title: "Considerations on a Way to Use Native Script to Write Foreign Names in Native Text"
start_date: "2022-03-27T10:30:00Z"
date: "2022-03-27T13:56:00Z"
tags: ["languages", "jj-mccullough", "ruby-characters"]
draft: false
comment_issue_id: 37
---

I recently watched a video on YouTube by <ExternalLink to="https://www.youtube.com/c/JJMcCullough">J.J. McCullough</ExternalLink> titled <ExternalLink to="https://www.youtube.com/watch?v=Bx7cIb1IRLc">"The impossible challenge of human NAMES"</ExternalLink> where he goes into how to deal with how to write foreign names in native texts. The common way to do this is by transcribing the original name into the native text. As an example, the name Yao Ming is a latin transcription of the Chinese name 姚明[^yao-ming]. As argued by J.J., doing this has made sense historically, but with modern technology and not to mention, modern sensibilities, it's becoming more and more uncouth to require people to transcribe their native names into a script in which it cannot be accurately represented.

On the one hand, I agree in full. Modern technology makes it fairly trivial to mix scripts in the same system/document. Case in point, I have 姚明 in this document surrounded by latin characters, a feat that was no harder than looking up his name to see how it is written in Chinese and then doing a copy-paste operation. On the other hand, to most people outside of China or the Chinese diaspora, 姚明 by itself doesn't mean anything. As someone with not even rudimentary understanding of Chinese, I don't know how to read those characters, nor do I know how to pronounce them. Seeing them written down, in a news article say, without additional context, would just leave me with nothing. For this to work, we have to find a sensible middle ground.

While watching the video, I was reminded of this concept called "ruby (or rubi) characters" that are

> small, annotative glosses that are usually placed above or to the right of logographic characters of languages in the East Asian cultural sphere, such as Chinese _hanzi_, Japanese _kanji_, and Korean _hanja_, to show the logographs' pronunciation.
>
> Source: https://en.wikipedia.org/wiki/Ruby_character

Here's an example of how that might look, using the city of Tokyo as an example, with hiragana, katakana and romaji, respectively: <Ruby rt="とう">東</Ruby><Ruby rt="きょう">京</Ruby>, <Ruby rt="トー">東</Ruby><Ruby rt="キョー">京</Ruby>, <Ruby rt="Tō">東</Ruby><Ruby rt="kyō">京</Ruby>.

While I'd certainly prefer seeing <Ruby rt="Tō">東</Ruby><Ruby rt="kyō">京</Ruby> over simply Tokyo, there's no reason this has to be limited to East-Asian scripts. I'd also prefer seeing e.g. <Ruby rt="Maria">Мари́я</Ruby> <Ruby rt="Yuryevna">Ю́рьевна</Ruby> <Ruby rt="Sharapova">Шара́пова</Ruby>[^maria-sharapova] or even <Ruby rt="Malala Yousafzai">ملاله یوسفزۍ</Ruby>[^malala] [^writing-direction] over their transcribed counterparts.

Although I don't expect any of this to happen anytime soon, it's still worth thinking about. If you haven't already, I recommend you go watch J.J.'s video on the topic as well as linked at the start of this post.

[^yao-ming]: Yao Ming is a former professional basketball player.
[^maria-sharapova]: Maria Sharapova is a former world No. 1 tennis player.
[^malala]: Malala is a Pakistani activist for female education and a Nobel Peace Prize laureate.
[^writing-direction]: One possible issue here is that due to the opposite writing direction, the ruby characters don't match well to the underlying foreign characters; it ends up looking like "یوسفزۍ" is "Malala," when it is in fact "ملاله" that is "Malala."
