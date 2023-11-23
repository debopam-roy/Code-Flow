import React, { useRef, useEffect } from 'react'

import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'

const Editor = () => {
  const editor = useRef()

  useEffect(() => {
    const startState = EditorState.create({
      doc: '// Your code goes here.',
      extensions: [keymap.of(defaultKeymap)],
    })

    const view = new EditorView({ state: startState, parent: editor.current })

    return () => {
      view.destroy()
    }
  }, [])

  return <div className='editor' ref={editor}></div>
};

export default Editor;