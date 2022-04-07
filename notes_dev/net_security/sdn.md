---
tags:
  - 网络安全
---
软件定义网络
===

!!! info ""
    SDN = Software Defined Networks 软件定义网络

## SDN的起源
* 原来的技术叫做OpenFlow
* 易于编程，随时改变路由策略 → SDN
* 最初，SDN意味着
    - 控制和数据层的分离
    - 中心化控制
    - 与数据层通信的是OpenFlow
* 现在定义明显改变了
    - 有面向硬件开放的接口
    - 至少一个可扩展的操作系统，可能开源
    - 良好的API编程接口

???+ summary "SDN的现代定义"
    SDN is a **framework** to allow network administrators to **automatically** and dynamically manage and control a **large number** of network devices, **services**, topology, traffic paths, and packet handling (quality of service) policies using high level languages and APIs. Management includes provisioning, operating, **monitoring**, optimizing, and managing FCAPS (faults, configuration, accounting, **performance**, and security) in a **multi tenant** environment.

## OpenFlow
### 结构
* 软件层
* 硬件层
* 控制器

!!! info "OpenFlow用途"
    OpenFlow将控制权下放到了远程软件上。

### Flow 表格表项
* 规则Rules
* 动作Action
* 状态统计Stats

### 功能
1. 流量迁移
    * FlowTable表：(flow,from,to,action)

2. 攻击检测
    * 使用southbound接口收集流量特征

3. 移动目标防御(MTD)
    * 对于攻击者来说，MTD让目标网络变得更加“动态”
    * 三种方法
        1. Network mapping and reconnaissance protection[^1]
            * 随机响应，抵抗DoS攻击
        2. Service version and OS hiding[^1]
            * TCP SYN-ACK 序列可能暴露服务版本或操作系统信息，所以序列号需要随机生成
        3. Random host or route mutation[^2][^3]
            * 目标机的IP随机变动，扰乱攻击者的分析

## RHM 与 RRM
攻击者获得的信息会过时。用于防御蠕虫、DoS等攻击。

## MTD策略选择——博弈论
* 在系统状态 $j$ 中，攻击者选择的策略为 $A_n$，防御者选择的策略为 $D_m$，$\eta _j(A_n,D_m)$ 表示 $D_m$ 对 $A_n$ 的防御效率 $(0\le \eta \le 1)$ ，攻击者造成的伤害为 $DM(A_n)$
* 攻击者回报函数：$RA(S_j,A_n,D_m)=DM(A_n)*(1-\eta _j(A_n,D_m))$
* 防御者回报函数：$RD(S_j,A_n,D_m)=DM(A_n)*\eta _j(A_n,D_m)$

!!! info "网络攻防博弈"
    * 防御者： $\pi_*^D=arg \mathbf{NASH}^D(RD(S_j,A_*,D_*),RA(S_J,A_*,D_*))$
    * 攻击者： $\pi_*^A=arg \mathbf{NASH}^A(RD(S_j,A_*,D_*),RA(S_J,A_*,D_*))$
    * 在网络攻防博弈中，攻防双方只有采取纳什均衡策略才能获得各自的最大化收益。

[^1]: Kampanakis, Panos, Harry Perros, and Tsegereda Beyene. "SDN based solutions for Moving Target Defense network protection." A World of Wireless, Mobile and Multimedia Networks (WoWMoM), 2014 IEEE 15th International Symposium on. IEEE,2014
[^2]: Jafarian, Jafar Haadi, Ehab Al Shaer, and Qi Duan. "Openflow random host mutation: transparent moving target defense using software defined networking." Proceedings of the first workshop on Hot topics in software defined networks. ACM,2012
[^3]: Duan, Qi, Ehab Al Shaer , and Haadi Jafarian . "Efficient random route mutation considering flow and network constraints." Communications and Network Security (CNS), 2013 IEEE Conference on. IEEE,2013
