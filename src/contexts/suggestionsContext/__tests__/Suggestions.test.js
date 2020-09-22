import React, { useContext } from 'react';
import { View } from 'react-native';
import { cleanup, render, waitFor } from '@testing-library/react-native';

import { SuggestionsContext, SuggestionsProvider } from '../SuggestionsContext';

const SuggestionsContextConsumer = ({ fn }) => {
  fn(useContext(SuggestionsContext));
  return <View testID='children' />;
};

describe('SuggestionsProvider', () => {
  afterEach(cleanup);

  it('renders children without crashing', async () => {
    const { getByTestId } = render(
      <SuggestionsProvider>
        <View testID='children' />
      </SuggestionsProvider>,
    );

    await waitFor(() => expect(getByTestId('children')).toBeTruthy());
  });

  it('exposes the suggestions context', async () => {
    let context;

    render(
      <SuggestionsProvider>
        <SuggestionsContextConsumer
          fn={(ctx) => {
            context = ctx;
          }}
        ></SuggestionsContextConsumer>
      </SuggestionsProvider>,
    );

    await waitFor(() => {
      expect(context).toBeInstanceOf(Object);
      expect(context.closeSuggestions).toBeInstanceOf(Function);
      expect(context.openSuggestions).toBeInstanceOf(Function);
      expect(context.setInputBoxContainerRef).toBeInstanceOf(Function);
      expect(context.updateSuggestions).toBeInstanceOf(Function);
    });
  });
});