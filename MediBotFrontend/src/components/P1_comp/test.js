const test = React.createClass({
  render: function() {
    return (
      <div>
        <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css" />
        <df-messenger location="asia-south1" project-id="chatbot-412309" agent-id="fb7cf8b0-d085-4fec-8098-b0b9b25bdc46" language-code="en" max-query-length={-1}>
          <df-messenger-chat-bubble chat-title="Healthcare">
          </df-messenger-chat-bubble>
        </df-messenger>
        <style dangerouslySetInnerHTML={{__html: "\n  df-messenger {\n    z-index: 999;\n    position: fixed;\n    bottom: 16px;\n    right: 16px;\n  }\n" }} />
      </div>
    );
  }
});