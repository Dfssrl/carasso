import { StoryWrapper } from '../../components/StoryWrapper/StoryWrapper';
import attributes from './attributes.json';
import { Header } from './Header';

export default { title: 'Header' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={Header} />;
}
