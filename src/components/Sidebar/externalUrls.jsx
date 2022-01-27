import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as FeedbackIcon } from "../../assets/icons/feedback.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  {
    title: <Trans>Forum</Trans>,
    url: "https://commonwealth.im/phantom-dao-mainnet",
    icon: <SvgIcon color="primary" component={ForumIcon} />,
  },
  {
    title: <Trans>Governance</Trans>,
    url: "https://commonwealth.im/phantom-dao-mainnet",
    icon: <SvgIcon color="primary" component={GovIcon} />,
  },
  {
    title: <Trans>Docs</Trans>,
    url: "https://www.notion.so/Phantom-Governance-01afd36a7b3c4d838d7456b84724e34e",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
];

export default externalUrls;
