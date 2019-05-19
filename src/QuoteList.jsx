
import React, { useState } from "react";

export default QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });