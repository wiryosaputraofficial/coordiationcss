"use client";

import { useRef, useState } from "react";
import SolarIcon from "../_components/SolarIcon";

type ComponentDemoProps = {
  name: string;
  title: string;
};

export default function ComponentDemo({ name, title }: ComponentDemoProps) {
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState("preview");
  const [slide, setSlide] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  switch (name) {
    case "button":
      return <button className="demo-button" type="button">Continue</button>;
    case "badge":
      return <span className="demo-badge">Stable</span>;
    case "card":
      return <div className="demo-card"><b>Project Alpha</b><span>12 collaborators</span><i>Active</i></div>;
    case "input":
      return <input className="demo-input" aria-label="Demo email" placeholder="you@example.com" />;
    case "textarea":
      return <textarea className="demo-input demo-textarea" aria-label="Demo message" placeholder="Write a message…" />;
    case "label":
      return <label className="demo-label">Email address<input className="demo-input" placeholder="name@company.com" /></label>;
    case "checkbox":
      return <label className="demo-check"><input type="checkbox" defaultChecked /><span>Accept terms</span></label>;
    case "switch":
      return <button type="button" role="switch" aria-checked={on} className={`demo-switch${on ? " is-on" : ""}`} onClick={() => setOn(!on)}><i /><span>{on ? "Enabled" : "Disabled"}</span></button>;
    case "alert":
      return <div className="demo-alert" role="alert"><b>Changes saved</b><span>Your project is up to date.</span></div>;
    case "separator":
      return <div className="demo-separator"><span>Account</span><i /><span>Security</span></div>;
    case "skeleton":
      return <div className="demo-skeleton"><i /><span><b /><b /></span></div>;
    case "spinner":
      return <div className="demo-spinner-wrap"><i className="demo-spinner" /><span>Loading</span></div>;
    case "avatar":
      return <div className="demo-avatar"><span>CO</span><div><b>Coordiation</b><small>@coordiation</small></div></div>;
    case "table":
      return <table className="demo-table"><thead><tr><th>Package</th><th>Status</th></tr></thead><tbody><tr><td>Core</td><td>Ready</td></tr><tr><td>UI</td><td>Ready</td></tr></tbody></table>;
    case "tabs":
      return <div className="demo-tabs"><div role="tablist"><button type="button" className={tab === "preview" ? "active" : ""} onClick={() => setTab("preview")}>Preview</button><button type="button" className={tab === "code" ? "active" : ""} onClick={() => setTab("code")}>Code</button></div><p>{tab === "preview" ? "Live component" : "Owned source"}</p></div>;
    case "dialog":
      return <><button className="demo-button" type="button" onClick={() => dialogRef.current?.showModal()}>Open dialog</button><dialog ref={dialogRef} className="demo-dialog" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}><b>Publish changes?</b><p>This will update your project.</p><button type="button" onClick={() => dialogRef.current?.close()}>Close</button></dialog></>;
    case "accordion":
      return <details className="demo-accordion" open><summary>Is it accessible?</summary><p>Native disclosure semantics.</p></details>;
    case "alert-dialog":
      return <><button className="demo-button demo-button-danger" type="button" onClick={() => dialogRef.current?.showModal()}>Delete project</button><dialog ref={dialogRef} className="demo-dialog"><b>Are you absolutely sure?</b><p>This action cannot be undone.</p><div><button type="button" onClick={() => dialogRef.current?.close()}>Cancel</button><button type="button" onClick={() => dialogRef.current?.close()}>Delete</button></div></dialog></>;
    case "aspect-ratio":
      return <div className="demo-aspect"><span>16:9</span><b>MEDIA</b></div>;
    case "attachment":
      return <div className="demo-attachment"><span><SolarIcon name="paperclip" size={18} /></span><div><b>brand-guideline.pdf</b><small>2.4 MB · PDF</small></div><button type="button" aria-label="Remove attachment"><SolarIcon name="close-circle" size={16} /></button></div>;
    case "breadcrumb":
      return <nav className="demo-breadcrumb" aria-label="Demo breadcrumb"><span>Docs</span><i>/</i><span>Components</span><i>/</i><b>Button</b></nav>;
    case "bubble":
      return <div className="demo-bubbles"><p>Can we ship today?</p><p>Yes, checks are green.</p></div>;
    case "button-group":
      return <div className="demo-button-group"><button type="button">Day</button><button type="button" className="active">Week</button><button type="button">Month</button></div>;
    case "calendar":
      return <div className="demo-calendar-full"><header><button type="button" aria-label="Previous month"><SolarIcon name="alt-arrow-left" size={15} /></button><b>August 2026</b><button type="button" aria-label="Next month"><SolarIcon name="alt-arrow-right" size={15} /></button></header><div><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>{[24, 25, 26, 27, 28, 29, 30].map((day) => <button type="button" className={day === 29 ? "active" : ""} key={day}>{day}</button>)}</div></div>;
    case "carousel":
      return <div className="demo-carousel"><button type="button" aria-label="Previous slide" onClick={() => setSlide(slide === 1 ? 3 : slide - 1)}><SolarIcon name="alt-arrow-left" size={16} /></button><div><b>0{slide}</b><span>Component story</span></div><button type="button" aria-label="Next slide" onClick={() => setSlide(slide === 3 ? 1 : slide + 1)}><SolarIcon name="alt-arrow-right" size={16} /></button></div>;
    case "chart":
      return <div className="demo-chart"><div><i style={{ height: "38%" }} /><i style={{ height: "65%" }} /><i style={{ height: "48%" }} /><i style={{ height: "86%" }} /><i style={{ height: "72%" }} /></div><span><b>+24%</b> weekly adoption</span></div>;
    case "collapsible":
      return <details className="demo-collapsible" open><summary><span>Framework settings</span><SolarIcon name="alt-arrow-down" size={14} /></summary><p>Prefix: <code>co-</code></p></details>;
    case "combobox":
      return <label className="demo-combobox"><span>Framework</span><input list="component-demo-frameworks" defaultValue="Coordiation" /><datalist id="component-demo-frameworks"><option value="Coordiation" /><option value="React" /><option value="Vue" /></datalist></label>;
    case "command":
      return <div className="demo-command"><label><span>⌘</span><input aria-label="Command search" placeholder="Type a command…" /></label><p>Suggestions</p><button type="button"><span>Open documentation</span><kbd>↵</kbd></button><button type="button"><span>Copy install command</span><kbd>⌘ C</kbd></button></div>;
    case "context-menu":
      return <details className="demo-menu demo-context" open><summary>Right-click area</summary><div role="menu"><button type="button" role="menuitem">Copy <kbd>⌘C</kbd></button><button type="button" role="menuitem">Duplicate <kbd>⌘D</kbd></button><button type="button" role="menuitem">Delete</button></div></details>;
    case "data-table":
      return <table className="demo-table demo-data-table"><thead><tr><th><input type="checkbox" aria-label="Select all" /></th><th>Task</th><th>Status</th></tr></thead><tbody><tr><td><input type="checkbox" aria-label="Select Tokens" /></td><td>Tokens</td><td><span>Done</span></td></tr><tr><td><input type="checkbox" aria-label="Select CLI" /></td><td>CLI</td><td><span>Review</span></td></tr></tbody></table>;
    case "date-picker":
      return <label className="demo-date"><span>Release date</span><input type="date" defaultValue="2026-08-29" /></label>;
    case "direction":
      return <div className="demo-direction"><div><span>LTR</span><p>Build for everyone →</p></div><div dir="rtl"><span>RTL</span><p>واجهة متكيفة ←</p></div></div>;
    case "drawer":
      return <div className={`demo-drawer${on ? " is-open" : ""}`}><button type="button" onClick={() => setOn(!on)}>{on ? "Close drawer" : "Open drawer"}</button><section><i /><b>Project settings</b><span>Configure your workspace.</span></section></div>;
    case "dropdown-menu":
      return <details className="demo-menu" open><summary>Actions <SolarIcon name="alt-arrow-down" size={14} /></summary><div role="menu"><button type="button" role="menuitem">Edit project</button><button type="button" role="menuitem">Make a copy</button><hr /><button type="button" role="menuitem">Archive</button></div></details>;
    case "empty":
      return <div className="demo-empty"><span><SolarIcon name="box-minimalistic" size={20} /></span><b>No projects yet</b><p>Create your first project to get started.</p><button type="button">New project</button></div>;
    case "field":
      return <label className="demo-field"><span>Workspace URL</span><input defaultValue="coordiation.dev" /><small>This will be your public address.</small></label>;
    case "hover-card":
      return <div className="demo-hover-card"><button type="button">@coordiation</button><aside><span>CO</span><div><b>Coordiation</b><p>AI-friendly utility framework.</p><small>Joined May 2026</small></div></aside></div>;
    case "input-group":
      return <div className="demo-input-group"><span>https://</span><input aria-label="Website domain" defaultValue="coordiation.dev" /><button type="button">Copy</button></div>;
    case "input-otp":
      return <div className="demo-otp" aria-label="One-time password"><input aria-label="Digit 1" maxLength={1} defaultValue="4" /><input aria-label="Digit 2" maxLength={1} defaultValue="8" /><input aria-label="Digit 3" maxLength={1} /><i /><input aria-label="Digit 4" maxLength={1} /><input aria-label="Digit 5" maxLength={1} /><input aria-label="Digit 6" maxLength={1} /></div>;
    case "item":
      return <div className="demo-item"><span>CO</span><div><b>Coordiation Core</b><small>Updated 2 minutes ago</small></div><button type="button" aria-label="More actions"><SolarIcon name="menu-dots" size={17} /></button></div>;
    case "kbd":
      return <div className="demo-kbd"><span>Open command menu</span><div><kbd>⌘</kbd><i>+</i><kbd>K</kbd></div></div>;
    case "marker":
      return <div className="demo-marker"><span><i />Live</span><p>Production deployment is healthy.</p></div>;
    case "menubar":
      return <div className="demo-menubar" role="menubar"><button type="button" role="menuitem">File</button><button type="button" role="menuitem">Edit</button><button type="button" role="menuitem">View</button><button type="button" role="menuitem">Help</button></div>;
    case "message":
      return <article className="demo-message"><span>AI</span><div><header><b>Coordiation Agent</b><small>now</small></header><p>I found 64 available components.</p></div></article>;
    case "message-scroller":
      return <div className="demo-message-scroll"><p><b>You</b><span>Check the registry.</span></p><p><b>Agent</b><span>All 64 components are indexed.</span></p><p><b>You</b><span>Generate the install command.</span></p></div>;
    case "native-select":
      return <label className="demo-native-select"><span>Deployment region</span><select defaultValue="sin"><option value="sin">Singapore</option><option value="fra">Frankfurt</option><option value="sfo">San Francisco</option></select></label>;
    case "navigation-menu":
      return <nav className="demo-navigation"><b>CO</b><a href="#component-catalog">Docs</a><a href="#component-catalog">Components</a><a href="#component-catalog">Examples</a><button type="button">Get started</button></nav>;
    case "pagination":
      return <nav className="demo-pagination" aria-label="Demo pagination"><button type="button" aria-label="Previous page"><SolarIcon name="arrow-left" size={15} /></button><button type="button">1</button><button type="button" className="active" aria-current="page">2</button><button type="button">3</button><button type="button" aria-label="Next page"><SolarIcon name="arrow-right" size={15} /></button></nav>;
    case "popover":
      return <details className="demo-popover" open><summary>Share</summary><div><b>Share component</b><section><input aria-label="Share URL" readOnly value="coordiation.dev/c/button" /><button type="button">Copy</button></section></div></details>;
    case "progress":
      return <div className="demo-progress-wrap"><div><span>Installing components</span><b>68%</b></div><div className="demo-progress"><span style={{ width: "68%" }} /></div></div>;
    case "questionnaire":
      return <fieldset className="demo-questionnaire"><legend>How will you use Coordiation?</legend><label><input type="radio" name="questionnaire-demo" defaultChecked /> Product app</label><label><input type="radio" name="questionnaire-demo" /> Design system</label><button type="button">Continue <SolarIcon name="arrow-right" size={13} /></button></fieldset>;
    case "radio-group":
      return <fieldset className="demo-radio"><legend>Notification level</legend><label><input type="radio" name="radio-demo" /> All activity</label><label><input type="radio" name="radio-demo" defaultChecked /> Mentions only</label><label><input type="radio" name="radio-demo" /> None</label></fieldset>;
    case "resizable":
      return <div className="demo-resizable"><section><span>Sidebar</span></section><i aria-hidden="true">⋮</i><section><span>Content</span></section></div>;
    case "scroll-area":
      return <div className="demo-scroll-area" tabIndex={0}>{["Layout", "Spacing", "Typography", "Backgrounds", "Borders", "Effects"].map((item) => <span key={item}>{item}</span>)}</div>;
    case "select":
      return <label className="demo-select"><span>Component</span><select defaultValue="dialog"><option value="dialog">Dialog</option><option value="button">Button</option><option value="tabs">Tabs</option></select><SolarIcon className="demo-select-icon" name="alt-arrow-down" size={14} /></label>;
    case "sheet":
      return <div className="demo-sheet"><main><span>Page content</span></main><aside><button type="button" aria-label="Close sheet"><SolarIcon name="close-circle" size={15} /></button><b>Edit profile</b><p>Update your public information.</p><label>Name<input defaultValue="Coordiation" /></label></aside></div>;
    case "sidebar":
      return <div className="demo-sidebar"><aside><b>CO</b><nav><button type="button" className="active"><SolarIcon name="home" size={13} /><span>Overview</span></button><button type="button"><SolarIcon name="widget-2" size={13} /><span>Components</span></button><button type="button"><SolarIcon name="settings" size={13} /><span>Settings</span></button></nav></aside><main><span>Workspace</span><b>Overview</b></main></div>;
    case "slider":
      return <label className="demo-slider"><span>Border radius <b>12px</b></span><input type="range" min="0" max="24" defaultValue="12" /></label>;
    case "toast":
      return <div className={`demo-toast${on ? "" : " is-hidden"}`} role="status"><span><SolarIcon name="check-circle" size={17} /></span><div><b>Deployment complete</b><small>Your site is now live.</small></div><button type="button" onClick={() => setOn(false)} aria-label="Dismiss notification"><SolarIcon name="close-circle" size={16} /></button></div>;
    case "toggle":
      return <button type="button" aria-pressed={on} className={`demo-toggle${on ? " active" : ""}`} onClick={() => setOn(!on)}><b>B</b><span>{on ? "Bold on" : "Bold off"}</span></button>;
    case "toggle-group":
      return <div className="demo-toggle-group"><button type="button">L</button><button type="button" className="active">C</button><button type="button">R</button></div>;
    case "tooltip":
      return <div className="demo-tooltip"><button type="button" aria-describedby="demo-tooltip-copy">Hover or focus</button><span role="tooltip" id="demo-tooltip-copy">Add to library</span></div>;
    case "typography":
      return <div className="demo-type"><b>Aa</b><span>Build with a system.</span><small>Inter · 16 / 24</small></div>;
    default:
      return <div className="demo-unavailable" role="status">Preview unavailable for {title}</div>;
  }
}
