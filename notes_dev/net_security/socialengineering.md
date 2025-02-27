社会工程学
===

!!! quote ""
	“社会工程学是指，通过自然的、社会的和制度上的途径，利用人的心理弱点（如人的本能反应、好奇心、信任、贪婪）以及规则制度上的漏洞，在攻击者和被攻击者之间建立起信任关系，获得有价值的信息，最终可以通过未经授权的路径访问需要经过授权才能访问的资源。”
	——2002，Kevin Mitnick, _The Art of Deception_

## 基本概念
* 利用人的弱点，建立信任关系
	- 心理弱点：同情心、好奇心、贪婪、从众心理、权威性、本能反应、信任关系
	- 人格
		* 是构成一个人的思想、情感及行为的特有模式，这个独特模式包含了一个人区别于他人的稳定而统一的心理品质。
		* 人格具有独特性、稳定性、统合性、功能性。
		* 成分：气质、性格、自我调控
		* 外倾性、宜人性和开放性的人格相对其他人格来说更容易回复钓鱼邮件[^1]
		* 成因：生物遗传、社会文化、家庭环境等因素
	- 影响和操纵
		* 权威
			- 钓鱼邮件中最常用的手段，200封钓鱼邮件中，几乎全部使用了权威手段[^2]
			- 米尔格伦实验（Milgram experiment)，又称权力服从研究（Obedience to Authority Study）[^3]
		* 从众
			- 根据他人而做出的行为或信念的改变
			- 阿施群体压力研究[^4]
		* 说服
			- 原则
				* 权威性：人们会听从可信的专家
				* 偏好：人们对自己所喜欢事物的反应更加积极
				* 社会证明：人们利用他人的例子来证实怎样思考、感觉和行动
				* 互惠性：人们感觉自己应该去回报所得到过的东西
				* 一致性：人们倾向于遵守自己公开做出的承诺
				* 珍奇性：物以稀为贵
		* 好心情效应：好心情通常可以增强说服力
		* 唤起恐惧效应：人们的恐惧程度越高，其回应就越多

* 无法通过技术措施进行防范（“防不胜防”）

## 形式

=== "Phishing"
	攻击者利用欺骗性的电子邮件和伪造的Web站点等渠道来进行网络诈骗活动，目的往往是骗取用户私人信息。

=== "Dumpster Diving"
	垃圾搜寻指的是通过查看个人或企业的垃圾箱发现有价值的私人信息或者企业信息。

=== "Shoulder Surfing"
	肩窥指的是通过直接观察的方法获取信息，例如偷看屏幕或者键盘等。

=== "Waterholing"
	水坑式攻击是指黑客通过分析被攻击者的网络活动规律，寻找被攻击者经常访问的网站的弱点，先攻下该网站并植入攻击代码，等待被攻击者来访时实施攻击。
	> 往往会提前布局

=== "Advanced Persistent Threat"
	高级持续性威胁是指组织(特别是政府)或者小团体利用先进的攻击手段对特定目标进行长期持续性网络攻击的攻击形式。

=== "Reverse Social Engineering"
	反向社会工程学攻击是在攻击者和攻击目标已经建立了联系的基础上，攻击者创造一个攻击目标需要获取帮助的情景，并且通过帮助攻击目标获取所需的敏感信息。
	> “你不需要帮助的话，我们给你创造一个。”

=== "Baiting"
	诱饵是将被恶意软件感染的存储介质放在其原本所在的位置，诱导目标发现并使用。

## 社会工程学模型[^5]：六个阶段
确定攻击对象
: 确定攻击目的和攻击目标

收集信息
: 确定有价值的资源、收集信息、获取信息权限

攻击准备
: 结合攻击目标分析收集到的信息、设计攻击方法
 
建立信任关系
: 通信渠道建立、建立信任关系

利用信任关系
: 引起目标关注、诱导

维护对象情绪
: 关注对象情绪，逐步诱导对象

## 攻与防

=== "发起攻击"
	* 信息收集：搜索引擎（人肉搜索）、个人信息泄露、网络攻击（植入木马等）、打电话、直接上门、利用社工库、社工字典、利用辅助安全问题等
	* 电话诱导
	* 网络钓鱼：钓鱼邮件、钓鱼网站、社交网络钓鱼等
		- 鱼叉式钓鱼邮件：针对特定的个人或组织，成功率高、危害性高

=== "抵御攻击"
	* 人员安全
		- 保护个人信息资料不外泄
		- 时刻提高警惕，不要轻易相信网络环境中的所看到的信息。
		- 保持理性思维
		- 不要随意丢弃废物
			* 防止垃圾搜寻攻击
	* 网络钓鱼防御
		- 基于黑白名单的检测：维护一个已经出现的钓鱼网站的黑名单和确定是正常网址的白名单。每次要访问某个网址的时候，通过比对名单上的网址，可以知道这个网址的可疑程度
		- 基于网站特征的启发式检测：基于页面特征、URL特征等自身特征进行机器学习，从而得到检测钓鱼网站的系统

## 典型事件
* [希拉里邮件门（钓鱼邮件） :octicons-link-external-16: ][Hillary]
* [京东数据泄露（信息泄露） :octicons-link-external-16: ][jingdong]
* [徐玉玉案（诈骗 + 信息泄露） :octicons-link-external-16: ][xu]

[^1]:Alseadoon I, Othman M F I, Chan T. What Is the Influence of Users’ Characteristics on Their Ability to Detect Phishing Emails?[M], Advanced Computer and Communication Engineering Technology. Springer International Publishing, 2015:949-962.

[^2]:Atkins B, Huang W. A Study of Social Engineering in Online Frauds[J]. Open Journal of Social Sciences, 2013, 01(3):23-32.

[^3]:实验为了测试一个普通的市民，只因一位辅助实验的科学家所下达的命令，而会愿意在另一个人身上加诸多少的痛苦。实验显示了成年人对于权力者有多么大的服从意愿，去做出几乎任何尺度的行为。

[^4]:一位受试者被安排坐在一间满是演员的房间里。实验人员展示了一幅画有三条编好号的线条的图像，并要求房间的人指出最长的那条。演员们故意给出了错误答案，以判断受试者是否会服从于错误的小组答案。实验表明群体压力导致了明显的趋同行为，虽然他们可能从未见过面，不认识

[^5]:Mouton F, Malan M M, Leenen L, et al. Social engineering attack framework[C],Information Security for South Africa (ISSA), 2014. IEEE, 2014: 1-9.

[Hillary]: https://baike.baidu.com/item/%E5%B8%8C%E6%8B%89%E9%87%8C%E9%82%AE%E4%BB%B6%E9%97%A8/19493835
[jingdong]: https://baike.baidu.com/item/%E4%BA%AC%E4%B8%9C%E6%95%B0%E6%8D%AE%E6%B3%84%E9%9C%B2%E9%97%A8/20278514
[xu]: https://baike.baidu.com/item/%E5%BE%90%E7%8E%89%E7%8E%89%E6%A1%88/20461294
