"""High school (9 to 12) scope lines, merged into scope.py's maps at import time."""
import scope as S

HS = {
    ('reading', 'Characters, setting and plot'): {
        (9, 10): 'analyze how complex characters develop over a text, interact with other characters, and advance the plot or develop the theme',
        (11, 12): "analyze the impact of an author's choices about how to develop and relate elements of a story (where it is set, how action is ordered, how characters are introduced)",
    },
    ('reading', 'Structure and point of view in literature'): {
        (9, 10): "analyze how an author's choices about structure, order of events and manipulation of time (pacing, flashbacks) create mystery, tension or surprise; analyze a point of view or cultural experience",
        (11, 12): "analyze how an author's choices about structure (where to begin or end, a comedic or tragic resolution) contribute to meaning; analyze point of view where what is said differs from what is meant (satire, irony, understatement)",
    },
    ('reading', 'Comparing stories and poems'): {
        (9, 10): 'analyze how an author draws on and transforms source material from an earlier work (a theme, a story pattern, a character type)',
        (11, 12): 'compare how two or more texts from the same period treat similar themes or topics',
    },
    ('reading', 'Connections between events and ideas'): {
        (9, 10): 'analyze how the author unfolds an analysis or series of ideas or events, including the order, how they are introduced and developed, and the connections drawn between them',
        (11, 12): 'analyze a complex set of ideas or sequence of events and explain how specific individuals, ideas or events interact and develop over the text',
    },
    ('reading', 'Text structure and features'): {
        (9, 10): "analyze in detail how an author's ideas or claims are developed and refined by particular sentences, paragraphs or larger sections",
        (11, 12): 'analyze and evaluate the effectiveness of the structure an author uses in an exposition or argument, including whether it makes points clear, convincing and engaging',
    },
    ('reading', "Author's purpose and point of view"): {
        (9, 10): "determine an author's point of view or purpose and analyze how the author uses rhetoric to advance it",
        (11, 12): "determine an author's point of view or purpose where the rhetoric is especially effective, analyzing how style and content contribute to its power or persuasiveness",
    },
    ('reading', 'Reasons, evidence and argument'): {
        (9, 10): 'delineate and evaluate the argument and claims, assessing validity of reasoning and relevance and sufficiency of evidence; identify false statements and fallacious reasoning',
        (11, 12): 'delineate and evaluate the reasoning in an argument, including its premises, purposes and arguments, and spot weak reasoning or unsupported claims',
    },
    ('reading', 'Figurative language and word relationships'): {
        (9, 10): 'interpret figures of speech (euphemism, oxymoron) in context and analyze their role; analyze nuances in the meaning of words with similar denotations',
        (11, 12): 'interpret figures of speech (hyperbole, paradox) in context and analyze their role; analyze nuances in the meaning of words with similar denotations',
    },
    ('writing', 'Grammar and usage'): {
        (9, 10): 'using parallel structure; using various types of phrases (noun, verb, adjectival, adverbial, participial, prepositional, absolute) and clauses (independent, dependent, noun, relative, adverbial) to convey meaning',
        (11, 12): 'resolving usage questions by standard convention (who and whom, less and fewer, affect and effect), agreement in complex sentences, pronoun clarity, and understanding that usage conventions can change over time',
    },
    ('writing', 'Capitalization and punctuation'): {
        (9, 10): 'using a semicolon (with or without a conjunctive adverb) to link closely related independent clauses; using a colon to introduce a list or quotation',
        (11, 12): 'observing hyphenation conventions (a compound adjective before a noun, as in a well-known author); comma, semicolon and colon use in complex sentences',
    },
    ('writing', 'Precise language and style'): {
        (9, 10): 'keeping a consistent formal style and objective tone; precise and concise word choice',
        (11, 12): 'varying syntax for effect; precise and concise word choice; keeping a consistent formal style',
    },
}

for (subject, name), spans in HS.items():
    m = (S.READING if subject == 'reading' else S.WRITING)[name]
    for grades, text in spans.items():
        for g in grades:
            m[g] = text

scope = S.scope
