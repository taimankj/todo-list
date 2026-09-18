function configureProjInput(projBox) {
  projBox.setAttribute("type", "text");
  projBox.setAttribute("minlength", "1");
  projBox.setAttribute("maxlength", "10");
  projBox.required = true;
  projBox.id = "new-project";
}

export { configureProjInput };
