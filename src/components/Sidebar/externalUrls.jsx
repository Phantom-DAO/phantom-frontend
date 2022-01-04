import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import GavelOutlined from "@material-ui/icons/GavelOutlined";
import FolderOutlined from "@material-ui/icons/FolderOutlined";
import ForumOutlined from "@material-ui/icons/ForumOutlined";
import Feedback from "@material-ui/icons/FeedbackOutlined";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  {
    title: <Trans>Forum</Trans>,
    url: "https://forum.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={ForumOutlined} />,
  },
  {
    title: <Trans>Governance</Trans>,
    url: "https://vote.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={GavelOutlined} />,
  },
  {
    title: <Trans>Docs</Trans>,
    url: "https://docs.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={FolderOutlined} />,
  },
  {
    title: "Feedback",
    url: "https://olympusdao.canny.io/",
    icon: <SvgIcon color="primary" component={Feedback} />,
  },
];

export default externalUrls;
