# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
import fuctions as fc
import streamlit as st
def add_text():
    text=fc.read_inFile()
    new_text=st.session_state["text"]+'\n'
    text.append(new_text)
    fc.write_inFile(text)

st.title("Demo web app with Interactive Interface")
st.subheader("Trying with File Handling")

texts=fc.read_inFile()
updated_texts = []
for i, text in enumerate(texts):
    check = st.checkbox(text, key=text)
    if not check:
        updated_texts.append(text)
    else:
        del st.session_state[text]
        fc.write_inFile(updated_texts)
        st.rerun()
st.text_input(label="",placeholder="Type Anything",key="text",on_change=add_text)