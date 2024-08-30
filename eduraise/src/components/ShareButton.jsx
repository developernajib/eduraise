import React from "react";
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookMessengerIcon,
	FacebookMessengerShareButton,
	FacebookShareButton,
	GabIcon,
	GabShareButton,
	HatenaIcon,
	HatenaShareButton,
	InstapaperIcon,
	InstapaperShareButton,
	LineIcon,
	LineShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	LivejournalIcon,
	LivejournalShareButton,
	MailruIcon,
	MailruShareButton,
	PocketIcon,
	PocketShareButton,
	RedditIcon,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TumblrIcon,
	TumblrShareButton,
	TwitterShareButton,
	ViberIcon,
	ViberShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	WorkplaceIcon,
	WorkplaceShareButton,
	XIcon,
} from "react-share";

export function ShareButton({ title }) {
	const shareUrl = window.location.href;

	return (
		<div className="flex flex-wrap gap-2 pl-0 p-2">
			<div className="flex-shrink-0" title="Facebook">
				<FacebookShareButton url={shareUrl} hashtag="#eduraise">
					<FacebookIcon size={32} round />
				</FacebookShareButton>
			</div>

			<div className="flex-shrink-0" title="Facebook Messenger">
				<FacebookMessengerShareButton
					url={shareUrl}
					appId="521270401588372"
				>
					<FacebookMessengerIcon size={32} round />
				</FacebookMessengerShareButton>
			</div>

			<div className="flex-shrink-0" title="Twitter">
				<TwitterShareButton url={shareUrl} title={title}>
					<XIcon size={32} round />
				</TwitterShareButton>
			</div>

			<div className="flex-shrink-0" title="Telegram">
				<TelegramShareButton url={shareUrl} title={title}>
					<TelegramIcon size={32} round />
				</TelegramShareButton>
			</div>

			<div className="flex-shrink-0" title="WhatsApp">
				<WhatsappShareButton
					url={shareUrl}
					title={title}
					separator=":: "
				>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
			</div>

			<div className="flex-shrink-0" title="LinkedIn">
				<LinkedinShareButton url={shareUrl}>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>
			</div>

			<div className="flex-shrink-0" title="Reddit">
				<RedditShareButton
					url={shareUrl}
					title={title}
					windowWidth={660}
					windowHeight={460}
				>
					<RedditIcon size={32} round />
				</RedditShareButton>
			</div>

			<div className="flex-shrink-0" title="Gab">
				<GabShareButton
					url={shareUrl}
					title={title}
					windowWidth={660}
					windowHeight={640}
				>
					<GabIcon size={32} round />
				</GabShareButton>
			</div>

			<div className="flex-shrink-0" title="Tumblr">
				<TumblrShareButton url={shareUrl} title={title}>
					<TumblrIcon size={32} round />
				</TumblrShareButton>
			</div>

			<div className="flex-shrink-0" title="Livejournal">
				<LivejournalShareButton
					url={shareUrl}
					title={title}
					description={shareUrl}
				>
					<LivejournalIcon size={32} round />
				</LivejournalShareButton>
			</div>

			<div className="flex-shrink-0" title="Mail.ru">
				<MailruShareButton url={shareUrl} title={title}>
					<MailruIcon size={32} round />
				</MailruShareButton>
			</div>

			<div className="flex-shrink-0" title="Share via Email">
				<EmailShareButton url={shareUrl} subject={title} body="body">
					<EmailIcon size={32} round />
				</EmailShareButton>
			</div>

			<div className="flex-shrink-0" title="Viber">
				<ViberShareButton url={shareUrl} title={title}>
					<ViberIcon size={32} round />
				</ViberShareButton>
			</div>

			<div className="flex-shrink-0" title="Workplace">
				<WorkplaceShareButton url={shareUrl} quote={title}>
					<WorkplaceIcon size={32} round />
				</WorkplaceShareButton>
			</div>

			<div className="flex-shrink-0" title="Line">
				<LineShareButton url={shareUrl} title={title}>
					<LineIcon size={32} round />
				</LineShareButton>
			</div>

			<div className="flex-shrink-0" title="Pocket">
				<PocketShareButton url={shareUrl} title={title}>
					<PocketIcon size={32} round />
				</PocketShareButton>
			</div>

			<div className="flex-shrink-0" title="Instapaper">
				<InstapaperShareButton url={shareUrl} title={title}>
					<InstapaperIcon size={32} round />
				</InstapaperShareButton>
			</div>

			<div className="flex-shrink-0" title="Hatena">
				<HatenaShareButton
					url={shareUrl}
					title={title}
					windowWidth={660}
					windowHeight={460}
				>
					<HatenaIcon size={32} round />
				</HatenaShareButton>
			</div>
		</div>
	);
}

export default ShareButton;
