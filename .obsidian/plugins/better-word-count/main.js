'use strict';

var obsidian = require('obsidian');
var state = require('@codemirror/state');
var view = require('@codemirror/view');

class StatusBar {
    constructor(statusBarEl) {
        this.statusBarEl = statusBarEl;
    }
    displayText(text) {
        this.statusBarEl.setText(text);
    }
}

class BetterWordCount extends obsidian.Plugin {
    // public currentFile: TFile;
    // public settings: BetterWordCountSettings;
    // public view: StatsView;
    // public dataManager: DataManager;
    // public barManager: BarManager;
    // onunload(): void {
    //   this.app.workspace
    //     .getLeavesOfType(VIEW_TYPE_STATS)
    //     .forEach((leaf) => leaf.detach());
    // }
    onload() {
        let statusBarEl = this.addStatusBarItem();
        BetterWordCount.statusBar = new StatusBar(statusBarEl);
        this.createCMExtension();
        // this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
        // this.addSettingTab(new BetterWordCountSettingsTab(this.app, this));
        // let statusBarElTest = this.addStatusBarItem();
        // statusBarElTest.setText("§l§aTest§r");
        // let statusBarEl = this.addStatusBarItem();
        // this.statusBar = new StatusBar(statusBarEl);
        // this.statusBar.displayText("Awesome");
        // this.barManager = new BarManager(
        //   this.statusBar,
        //   this.settings,
        //   this.app.vault,
        //   this.app.metadataCache
        // );
        // if (this.settings.collectStats) {
        //   this.dataManager = new DataManager(
        //     this.app.vault,
        //     this.app.metadataCache
        //   );
        // }
        // this.registerEvent(
        //   this.app.workspace.on("active-leaf-change", this.activeLeafChange, this)
        // );
        // this.registerCodeMirror((cm: CodeMirror.Editor) => {
        //   cm.on("cursorActivity", (cm: CodeMirror.Editor) =>
        //     this.barManager.cursorActivity(cm)
        //   );
        // });
        // if (this.settings.collectStats) {
        //   this.registerEvent(
        //     this.app.workspace.on(
        //       "quick-preview",
        //       this.dataManager.debounceChange,
        //       this.dataManager
        //     )
        //   );
        //   this.registerInterval(
        //     window.setInterval(() => {
        //       this.dataManager.setTotalStats();
        //     }, 1000 * 60)
        //   );
        // }
        // addIcon(STATS_ICON_NAME, STATS_ICON);
        // this.addCommand({
        //   id: "show-vault-stats-view",
        //   name: "Open Statistics",
        //   checkCallback: (checking: boolean) => {
        //     if (checking) {
        //       return this.app.workspace.getLeavesOfType("vault-stats").length === 0;
        //     }
        //     this.initLeaf();
        //   },
        // });
        // this.registerView(
        //   VIEW_TYPE_STATS,
        //   (leaf: WorkspaceLeaf) => (this.view = new StatsView(leaf))
        // );
        // if (this.app.workspace.layoutReady) {
        //   this.initLeaf();
        // } else {
        //   this.app.workspace.onLayoutReady(() => this.initLeaf());
        // }
    }
    // activeLeafChange(leaf: WorkspaceLeaf) {
    //   if (!(leaf.view.getViewType() === "markdown")) {
    //     this.barManager.updateAltStatusBar();
    //   }
    // }
    // async saveSettings(): Promise<void> {
    //   await this.saveData(this.settings);
    // }
    // initLeaf(): void {
    //   if (this.app.workspace.getLeavesOfType(VIEW_TYPE_STATS).length) {
    //     return;
    //   }
    //   this.app.workspace.getRightLeaf(false).setViewState({
    //     type: VIEW_TYPE_STATS,
    //   });
    // }
    createCMExtension() {
        const cmStateField = state.StateField.define({
            create(state) {
                return view.Decoration.none;
            },
            update(effects, tr) {
                let text = "";
                const selection = tr.newSelection.main;
                if (selection.empty) {
                    const textIter = tr.newDoc.iter();
                    while (!textIter.done) {
                        text = text + textIter.next().value;
                    }
                }
                else {
                    const textIter = tr.newDoc.iterRange(selection.from, selection.to);
                    while (!textIter.done) {
                        text = text + textIter.next().value;
                    }
                }
                BetterWordCount.updateStatusBar(text);
                return effects;
            },
            provide: (f) => view.EditorView.decorations.from(f),
        });
        this.registerEditorExtension(cmStateField);
    }
    static updateStatusBar(text) {
        const words = this.getWordCount(text);
        const chars = this.getCharacterCount(text);
        this.statusBar.displayText(`${words} words ${chars} characters`);
    }
    static getWordCount(text) {
        const spaceDelimitedChars = /A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/
            .source;
        const nonSpaceDelimitedWords = /\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u4E00-\u9FD5/.source;
        const nonSpaceDelimitedWordsOther = /[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u4E00-\u9FD5]{1}/
            .source;
        const pattern = new RegExp([
            `(?:[0-9]+(?:(?:,|\\.)[0-9]+)*|[\\-${spaceDelimitedChars}])+`,
            nonSpaceDelimitedWords,
            nonSpaceDelimitedWordsOther,
        ].join("|"), "g");
        return (text.match(pattern) || []).length;
    }
    static getCharacterCount(text) {
        return text.length;
    }
}

module.exports = BetterWordCount;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YXR1cy9iYXIudHMiLCIuLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RhdHVzQmFyIHtcbiAgcHJpdmF0ZSBzdGF0dXNCYXJFbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3Ioc3RhdHVzQmFyRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5zdGF0dXNCYXJFbCA9IHN0YXR1c0JhckVsO1xuICB9XG5cbiAgZGlzcGxheVRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5zdGF0dXNCYXJFbC5zZXRUZXh0KHRleHQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQbHVnaW4sIFRGaWxlLCBhZGRJY29uLCBXb3Jrc3BhY2VMZWFmLCBNYXJrZG93bkVkaXRWaWV3LCBNYXJrZG93blZpZXcsIE1hcmtkb3duU291cmNlVmlldywgZWRpdG9yVmlld0ZpZWxkLCBlZGl0b3JFZGl0b3JGaWVsZCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbi8vIGltcG9ydCB7IEJldHRlcldvcmRDb3VudFNldHRpbmdzVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3Mvc2V0dGluZ3MtdGFiXCI7XHJcbi8vIGltcG9ydCB7IEJldHRlcldvcmRDb3VudFNldHRpbmdzLCBERUZBVUxUX1NFVFRJTkdTIH0gZnJvbSBcIi4vc2V0dGluZ3Mvc2V0dGluZ3NcIjtcclxuLy8gaW1wb3J0IHsgU3RhdHVzQmFyIH0gZnJvbSBcIi4vc3RhdHVzL2JhclwiO1xyXG4vLyBpbXBvcnQgeyBTVEFUU19JQ09OLCBTVEFUU19JQ09OX05BTUUsIFZJRVdfVFlQRV9TVEFUUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG4vLyBpbXBvcnQgU3RhdHNWaWV3IGZyb20gXCIuL3ZpZXcvdmlld1wiO1xyXG4vLyBpbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gXCIuL2RhdGEvbWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBCYXJNYW5hZ2VyIH0gZnJvbSBcIi4vc3RhdHVzL21hbmFnZXJcIjtcclxuXHJcbi8vIGltcG9ydCB7fSBmcm9tIFwiQGNvZGVtaXJyb3IvdGV4dFwiO1xyXG5pbXBvcnQge0VkaXRvclN0YXRlLCBTdGF0ZUVmZmVjdCwgU3RhdGVGaWVsZCwgVHJhbnNhY3Rpb259IGZyb20gXCJAY29kZW1pcnJvci9zdGF0ZVwiO1xyXG5cclxuLy8gaW1wb3J0IHR5cGUgQ29kZU1pcnJvciBmcm9tIFwiY29kZW1pcnJvclwiO1xyXG5pbXBvcnQgeyBEZWNvcmF0aW9uLCBEZWNvcmF0aW9uU2V0LCBFZGl0b3JWaWV3IH0gZnJvbSBcIkBjb2RlbWlycm9yL3ZpZXdcIjtcclxuaW1wb3J0IHsgU3RhdHVzQmFyIH0gZnJvbSBcIi4vc3RhdHVzL2JhclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmV0dGVyV29yZENvdW50IGV4dGVuZHMgUGx1Z2luIHtcclxuICBwdWJsaWMgc3RhdGljIHN0YXR1c0JhcjogU3RhdHVzQmFyO1xyXG4gIC8vIHB1YmxpYyBjdXJyZW50RmlsZTogVEZpbGU7XHJcbiAgLy8gcHVibGljIHNldHRpbmdzOiBCZXR0ZXJXb3JkQ291bnRTZXR0aW5ncztcclxuICAvLyBwdWJsaWMgdmlldzogU3RhdHNWaWV3O1xyXG4gIC8vIHB1YmxpYyBkYXRhTWFuYWdlcjogRGF0YU1hbmFnZXI7XHJcbiAgLy8gcHVibGljIGJhck1hbmFnZXI6IEJhck1hbmFnZXI7XHJcblxyXG4gIC8vIG9udW5sb2FkKCk6IHZvaWQge1xyXG4gIC8vICAgdGhpcy5hcHAud29ya3NwYWNlXHJcbiAgLy8gICAgIC5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NUQVRTKVxyXG4gIC8vICAgICAuZm9yRWFjaCgobGVhZikgPT4gbGVhZi5kZXRhY2goKSk7XHJcbiAgLy8gfVxyXG5cclxuICBvbmxvYWQoKSB7XHJcbiAgICBsZXQgc3RhdHVzQmFyRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuICAgIEJldHRlcldvcmRDb3VudC5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyKHN0YXR1c0JhckVsKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNNRXh0ZW5zaW9uKCk7XHJcblxyXG4gICAgLy8gdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuICAgIC8vIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgQmV0dGVyV29yZENvdW50U2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcbiAgICAvLyBsZXQgc3RhdHVzQmFyRWxUZXN0ID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCk7XHJcbiAgICAvLyBzdGF0dXNCYXJFbFRlc3Quc2V0VGV4dChcIsKnbMKnYVRlc3TCp3JcIik7XHJcbiAgICAvLyBsZXQgc3RhdHVzQmFyRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuICAgIC8vIHRoaXMuc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcihzdGF0dXNCYXJFbCk7XHJcbiAgICAvLyB0aGlzLnN0YXR1c0Jhci5kaXNwbGF5VGV4dChcIkF3ZXNvbWVcIik7XHJcbiAgICAvLyB0aGlzLmJhck1hbmFnZXIgPSBuZXcgQmFyTWFuYWdlcihcclxuICAgIC8vICAgdGhpcy5zdGF0dXNCYXIsXHJcbiAgICAvLyAgIHRoaXMuc2V0dGluZ3MsXHJcbiAgICAvLyAgIHRoaXMuYXBwLnZhdWx0LFxyXG4gICAgLy8gICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLnNldHRpbmdzLmNvbGxlY3RTdGF0cykge1xyXG4gICAgLy8gICB0aGlzLmRhdGFNYW5hZ2VyID0gbmV3IERhdGFNYW5hZ2VyKFxyXG4gICAgLy8gICAgIHRoaXMuYXBwLnZhdWx0LFxyXG4gICAgLy8gICAgIHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGVcclxuICAgIC8vICAgKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAvLyAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImFjdGl2ZS1sZWFmLWNoYW5nZVwiLCB0aGlzLmFjdGl2ZUxlYWZDaGFuZ2UsIHRoaXMpXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIHRoaXMucmVnaXN0ZXJDb2RlTWlycm9yKChjbTogQ29kZU1pcnJvci5FZGl0b3IpID0+IHtcclxuICAgIC8vICAgY20ub24oXCJjdXJzb3JBY3Rpdml0eVwiLCAoY206IENvZGVNaXJyb3IuRWRpdG9yKSA9PlxyXG4gICAgLy8gICAgIHRoaXMuYmFyTWFuYWdlci5jdXJzb3JBY3Rpdml0eShjbSlcclxuICAgIC8vICAgKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgLy8gaWYgKHRoaXMuc2V0dGluZ3MuY29sbGVjdFN0YXRzKSB7XHJcbiAgICAvLyAgIHRoaXMucmVnaXN0ZXJFdmVudChcclxuICAgIC8vICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXHJcbiAgICAvLyAgICAgICBcInF1aWNrLXByZXZpZXdcIixcclxuICAgIC8vICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuZGVib3VuY2VDaGFuZ2UsXHJcbiAgICAvLyAgICAgICB0aGlzLmRhdGFNYW5hZ2VyXHJcbiAgICAvLyAgICAgKVxyXG4gICAgLy8gICApO1xyXG5cclxuICAgIC8vICAgdGhpcy5yZWdpc3RlckludGVydmFsKFxyXG4gICAgLy8gICAgIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNldFRvdGFsU3RhdHMoKTtcclxuICAgIC8vICAgICB9LCAxMDAwICogNjApXHJcbiAgICAvLyAgICk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gYWRkSWNvbihTVEFUU19JQ09OX05BTUUsIFNUQVRTX0lDT04pO1xyXG5cclxuICAgIC8vIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAvLyAgIGlkOiBcInNob3ctdmF1bHQtc3RhdHMtdmlld1wiLFxyXG4gICAgLy8gICBuYW1lOiBcIk9wZW4gU3RhdGlzdGljc1wiLFxyXG4gICAgLy8gICBjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHtcclxuICAgIC8vICAgICBpZiAoY2hlY2tpbmcpIHtcclxuICAgIC8vICAgICAgIHJldHVybiB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFwidmF1bHQtc3RhdHNcIikubGVuZ3RoID09PSAwO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB0aGlzLmluaXRMZWFmKCk7XHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyB0aGlzLnJlZ2lzdGVyVmlldyhcclxuICAgIC8vICAgVklFV19UWVBFX1NUQVRTLFxyXG4gICAgLy8gICAobGVhZjogV29ya3NwYWNlTGVhZikgPT4gKHRoaXMudmlldyA9IG5ldyBTdGF0c1ZpZXcobGVhZikpXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkpIHtcclxuICAgIC8vICAgdGhpcy5pbml0TGVhZigpO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgdGhpcy5hcHAud29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4gdGhpcy5pbml0TGVhZigpKTtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8vIGFjdGl2ZUxlYWZDaGFuZ2UobGVhZjogV29ya3NwYWNlTGVhZikge1xyXG4gIC8vICAgaWYgKCEobGVhZi52aWV3LmdldFZpZXdUeXBlKCkgPT09IFwibWFya2Rvd25cIikpIHtcclxuICAvLyAgICAgdGhpcy5iYXJNYW5hZ2VyLnVwZGF0ZUFsdFN0YXR1c0JhcigpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgLy8gYXN5bmMgc2F2ZVNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIC8vICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAvLyB9XHJcblxyXG4gIC8vIGluaXRMZWFmKCk6IHZvaWQge1xyXG4gIC8vICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NUQVRTKS5sZW5ndGgpIHtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgdGhpcy5hcHAud29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSkuc2V0Vmlld1N0YXRlKHtcclxuICAvLyAgICAgdHlwZTogVklFV19UWVBFX1NUQVRTLFxyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgY3JlYXRlQ01FeHRlbnNpb24oKSB7XHJcblxyXG4gICAgY29uc3QgY21TdGF0ZUZpZWxkID0gU3RhdGVGaWVsZC5kZWZpbmU8RGVjb3JhdGlvblNldD4oe1xyXG4gICAgICBjcmVhdGUoc3RhdGU6IEVkaXRvclN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuICBEZWNvcmF0aW9uLm5vbmU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZShlZmZlY3RzOiBEZWNvcmF0aW9uU2V0LCB0cjogVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICBsZXQgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdHIubmV3U2VsZWN0aW9uLm1haW47XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xyXG4gICAgICAgICAgY29uc3QgdGV4dEl0ZXIgPSB0ci5uZXdEb2MuaXRlcigpO1xyXG4gICAgICAgICAgd2hpbGUgKCF0ZXh0SXRlci5kb25lKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0ICsgdGV4dEl0ZXIubmV4dCgpLnZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0SXRlciA9IHRyLm5ld0RvYy5pdGVyUmFuZ2Uoc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50byk7XHJcbiAgICAgICAgICB3aGlsZSAoIXRleHRJdGVyLmRvbmUpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQgKyB0ZXh0SXRlci5uZXh0KCkudmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCZXR0ZXJXb3JkQ291bnQudXBkYXRlU3RhdHVzQmFyKHRleHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlZmZlY3RzO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgcHJvdmlkZTogKGY6IGFueSkgPT4gRWRpdG9yVmlldy5kZWNvcmF0aW9ucy5mcm9tKGYpLFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHRoaXMucmVnaXN0ZXJFZGl0b3JFeHRlbnNpb24oY21TdGF0ZUZpZWxkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVTdGF0dXNCYXIodGV4dDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB3b3JkcyA9IHRoaXMuZ2V0V29yZENvdW50KHRleHQpO1xyXG4gICAgY29uc3QgY2hhcnMgPSB0aGlzLmdldENoYXJhY3RlckNvdW50KHRleHQpO1xyXG5cclxuICAgIHRoaXMuc3RhdHVzQmFyLmRpc3BsYXlUZXh0KGAke3dvcmRzfSB3b3JkcyAke2NoYXJzfSBjaGFyYWN0ZXJzYCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0V29yZENvdW50KHRleHQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBjb25zdCBzcGFjZURlbGltaXRlZENoYXJzID1cclxuICAgICAgL0EtWmEtelxcdTAwQUFcXHUwMEI1XFx1MDBCQVxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDJDMVxcdTAyQzYtXFx1MDJEMVxcdTAyRTAtXFx1MDJFNFxcdTAyRUNcXHUwMkVFXFx1MDM3MC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdBLVxcdTAzN0RcXHUwMzdGXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFLVxcdTAzQTFcXHUwM0EzLVxcdTAzRjVcXHUwM0Y3LVxcdTA0ODFcXHUwNDhBLVxcdTA1MkZcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDVEMC1cXHUwNUVBXFx1MDVGMC1cXHUwNUYyXFx1MDYyMC1cXHUwNjRBXFx1MDY2RVxcdTA2NkZcXHUwNjcxLVxcdTA2RDNcXHUwNkQ1XFx1MDZFNVxcdTA2RTZcXHUwNkVFXFx1MDZFRlxcdTA2RkEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3Q0EtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4QTAtXFx1MDhCNFxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3MS1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RjBcXHUwOUYxXFx1MEEwNS1cXHUwQTBBXFx1MEEwRlxcdTBBMTBcXHUwQTEzLVxcdTBBMjhcXHUwQTJBLVxcdTBBMzBcXHUwQTMyXFx1MEEzM1xcdTBBMzVcXHUwQTM2XFx1MEEzOFxcdTBBMzlcXHUwQTU5LVxcdTBBNUNcXHUwQTVFXFx1MEE3Mi1cXHUwQTc0XFx1MEE4NS1cXHUwQThEXFx1MEE4Ri1cXHUwQTkxXFx1MEE5My1cXHUwQUE4XFx1MEFBQS1cXHUwQUIwXFx1MEFCMlxcdTBBQjNcXHUwQUI1LVxcdTBBQjlcXHUwQUJEXFx1MEFEMFxcdTBBRTBcXHUwQUUxXFx1MEFGOVxcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNEXFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjFcXHUwQjcxXFx1MEI4M1xcdTBCODUtXFx1MEI4QVxcdTBCOEUtXFx1MEI5MFxcdTBCOTItXFx1MEI5NVxcdTBCOTlcXHUwQjlBXFx1MEI5Q1xcdTBCOUVcXHUwQjlGXFx1MEJBM1xcdTBCQTRcXHUwQkE4LVxcdTBCQUFcXHUwQkFFLVxcdTBCQjlcXHUwQkQwXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzM5XFx1MEMzRFxcdTBDNTgtXFx1MEM1QVxcdTBDNjBcXHUwQzYxXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDREVcXHUwQ0UwXFx1MENFMVxcdTBDRjFcXHUwQ0YyXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRFxcdTBENEVcXHUwRDVGLVxcdTBENjFcXHUwRDdBLVxcdTBEN0ZcXHUwRDg1LVxcdTBEOTZcXHUwRDlBLVxcdTBEQjFcXHUwREIzLVxcdTBEQkJcXHUwREJEXFx1MERDMC1cXHUwREM2XFx1MEUwMS1cXHUwRTMwXFx1MEUzMlxcdTBFMzNcXHUwRTQwLVxcdTBFNDZcXHUwRTgxXFx1MEU4MlxcdTBFODRcXHUwRTg3XFx1MEU4OFxcdTBFOEFcXHUwRThEXFx1MEU5NC1cXHUwRTk3XFx1MEU5OS1cXHUwRTlGXFx1MEVBMS1cXHUwRUEzXFx1MEVBNVxcdTBFQTdcXHUwRUFBXFx1MEVBQlxcdTBFQUQtXFx1MEVCMFxcdTBFQjJcXHUwRUIzXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEY0MC1cXHUwRjQ3XFx1MEY0OS1cXHUwRjZDXFx1MEY4OC1cXHUwRjhDXFx1MTAwMC1cXHUxMDJBXFx1MTAzRlxcdTEwNTAtXFx1MTA1NVxcdTEwNUEtXFx1MTA1RFxcdTEwNjFcXHUxMDY1XFx1MTA2NlxcdTEwNkUtXFx1MTA3MFxcdTEwNzUtXFx1MTA4MVxcdTEwOEVcXHUxMEEwLVxcdTEwQzVcXHUxMEM3XFx1MTBDRFxcdTEwRDAtXFx1MTBGQVxcdTEwRkMtXFx1MTI0OFxcdTEyNEEtXFx1MTI0RFxcdTEyNTAtXFx1MTI1NlxcdTEyNThcXHUxMjVBLVxcdTEyNURcXHUxMjYwLVxcdTEyODhcXHUxMjhBLVxcdTEyOERcXHUxMjkwLVxcdTEyQjBcXHUxMkIyLVxcdTEyQjVcXHUxMkI4LVxcdTEyQkVcXHUxMkMwXFx1MTJDMi1cXHUxMkM1XFx1MTJDOC1cXHUxMkQ2XFx1MTJEOC1cXHUxMzEwXFx1MTMxMi1cXHUxMzE1XFx1MTMxOC1cXHUxMzVBXFx1MTM4MC1cXHUxMzhGXFx1MTNBMC1cXHUxM0Y1XFx1MTNGOC1cXHUxM0ZEXFx1MTQwMS1cXHUxNjZDXFx1MTY2Ri1cXHUxNjdGXFx1MTY4MS1cXHUxNjlBXFx1MTZBMC1cXHUxNkVBXFx1MTZGMS1cXHUxNkY4XFx1MTcwMC1cXHUxNzBDXFx1MTcwRS1cXHUxNzExXFx1MTcyMC1cXHUxNzMxXFx1MTc0MC1cXHUxNzUxXFx1MTc2MC1cXHUxNzZDXFx1MTc2RS1cXHUxNzcwXFx1MTc4MC1cXHUxN0IzXFx1MTdEN1xcdTE3RENcXHUxODIwLVxcdTE4NzdcXHUxODgwLVxcdTE4QThcXHUxOEFBXFx1MThCMC1cXHUxOEY1XFx1MTkwMC1cXHUxOTFFXFx1MTk1MC1cXHUxOTZEXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOUFCXFx1MTlCMC1cXHUxOUM5XFx1MUEwMC1cXHUxQTE2XFx1MUEyMC1cXHUxQTU0XFx1MUFBN1xcdTFCMDUtXFx1MUIzM1xcdTFCNDUtXFx1MUI0QlxcdTFCODMtXFx1MUJBMFxcdTFCQUVcXHUxQkFGXFx1MUJCQS1cXHUxQkU1XFx1MUMwMC1cXHUxQzIzXFx1MUM0RC1cXHUxQzRGXFx1MUM1QS1cXHUxQzdEXFx1MUNFOS1cXHUxQ0VDXFx1MUNFRS1cXHUxQ0YxXFx1MUNGNVxcdTFDRjZcXHUxRDAwLVxcdTFEQkZcXHUxRTAwLVxcdTFGMTVcXHUxRjE4LVxcdTFGMURcXHUxRjIwLVxcdTFGNDVcXHUxRjQ4LVxcdTFGNERcXHUxRjUwLVxcdTFGNTdcXHUxRjU5XFx1MUY1QlxcdTFGNURcXHUxRjVGLVxcdTFGN0RcXHUxRjgwLVxcdTFGQjRcXHUxRkI2LVxcdTFGQkNcXHUxRkJFXFx1MUZDMi1cXHUxRkM0XFx1MUZDNi1cXHUxRkNDXFx1MUZEMC1cXHUxRkQzXFx1MUZENi1cXHUxRkRCXFx1MUZFMC1cXHUxRkVDXFx1MUZGMi1cXHUxRkY0XFx1MUZGNi1cXHUxRkZDXFx1MjA3MVxcdTIwN0ZcXHUyMDkwLVxcdTIwOUNcXHUyMTAyXFx1MjEwN1xcdTIxMEEtXFx1MjExM1xcdTIxMTVcXHUyMTE5LVxcdTIxMURcXHUyMTI0XFx1MjEyNlxcdTIxMjhcXHUyMTJBLVxcdTIxMkRcXHUyMTJGLVxcdTIxMzlcXHUyMTNDLVxcdTIxM0ZcXHUyMTQ1LVxcdTIxNDlcXHUyMTRFXFx1MjE4M1xcdTIxODRcXHUyQzAwLVxcdTJDMkVcXHUyQzMwLVxcdTJDNUVcXHUyQzYwLVxcdTJDRTRcXHUyQ0VCLVxcdTJDRUVcXHUyQ0YyXFx1MkNGM1xcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJFMkZcXHUzMDA1XFx1MzAwNlxcdTMwMzEtXFx1MzAzNVxcdTMwM0JcXHUzMDNDXFx1MzEwNS1cXHUzMTJEXFx1MzEzMS1cXHUzMThFXFx1MzFBMC1cXHUzMUJBXFx1MzFGMC1cXHUzMUZGXFx1MzQwMC1cXHU0REI1XFx1QTAwMC1cXHVBNDhDXFx1QTREMC1cXHVBNEZEXFx1QTUwMC1cXHVBNjBDXFx1QTYxMC1cXHVBNjFGXFx1QTYyQVxcdUE2MkJcXHVBNjQwLVxcdUE2NkVcXHVBNjdGLVxcdUE2OURcXHVBNkEwLVxcdUE2RTVcXHVBNzE3LVxcdUE3MUZcXHVBNzIyLVxcdUE3ODhcXHVBNzhCLVxcdUE3QURcXHVBN0IwLVxcdUE3QjdcXHVBN0Y3LVxcdUE4MDFcXHVBODAzLVxcdUE4MDVcXHVBODA3LVxcdUE4MEFcXHVBODBDLVxcdUE4MjJcXHVBODQwLVxcdUE4NzNcXHVBODgyLVxcdUE4QjNcXHVBOEYyLVxcdUE4RjdcXHVBOEZCXFx1QThGRFxcdUE5MEEtXFx1QTkyNVxcdUE5MzAtXFx1QTk0NlxcdUE5NjAtXFx1QTk3Q1xcdUE5ODQtXFx1QTlCMlxcdUE5Q0ZcXHVBOUUwLVxcdUE5RTRcXHVBOUU2LVxcdUE5RUZcXHVBOUZBLVxcdUE5RkVcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE3RS1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNjVcXHVBQjcwLVxcdUFCRTJcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGQjM2XFx1RkIzOC1cXHVGQjNDXFx1RkIzRVxcdUZCNDBcXHVGQjQxXFx1RkI0M1xcdUZCNDRcXHVGQjQ2LVxcdUZCQjFcXHVGQkQzLVxcdUZEM0RcXHVGRDUwLVxcdUZEOEZcXHVGRDkyLVxcdUZEQzdcXHVGREYwLVxcdUZERkJcXHVGRTcwLVxcdUZFNzRcXHVGRTc2LVxcdUZFRkNcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcXHVGRjY2LVxcdUZGQkVcXHVGRkMyLVxcdUZGQzdcXHVGRkNBLVxcdUZGQ0ZcXHVGRkQyLVxcdUZGRDdcXHVGRkRBLVxcdUZGREMvXHJcbiAgICAgICAgLnNvdXJjZTtcclxuICAgIGNvbnN0IG5vblNwYWNlRGVsaW1pdGVkV29yZHMgPVxyXG4gICAgICAvXFx1MzA0MS1cXHUzMDk2XFx1MzA5RC1cXHUzMDlGXFx1MzBBMS1cXHUzMEZBXFx1MzBGQy1cXHUzMEZGXFx1NEUwMC1cXHU5RkQ1Ly5zb3VyY2U7XHJcbiAgXHJcbiAgICBjb25zdCBub25TcGFjZURlbGltaXRlZFdvcmRzT3RoZXIgPVxyXG4gICAgICAvW1xcdTMwNDEtXFx1MzA5NlxcdTMwOUQtXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTRFMDAtXFx1OUZENV17MX0vXHJcbiAgICAgICAgLnNvdXJjZTtcclxuICBcclxuICAgIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKFxyXG4gICAgICBbXHJcbiAgICAgICAgYCg/OlswLTldKyg/Oig/Oix8XFxcXC4pWzAtOV0rKSp8W1xcXFwtJHtzcGFjZURlbGltaXRlZENoYXJzfV0pK2AsXHJcbiAgICAgICAgbm9uU3BhY2VEZWxpbWl0ZWRXb3JkcyxcclxuICAgICAgICBub25TcGFjZURlbGltaXRlZFdvcmRzT3RoZXIsXHJcbiAgICAgIF0uam9pbihcInxcIiksXHJcbiAgICAgIFwiZ1wiXHJcbiAgICApO1xyXG4gICAgcmV0dXJuICh0ZXh0Lm1hdGNoKHBhdHRlcm4pIHx8IFtdKS5sZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBnZXRDaGFyYWN0ZXJDb3VudCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRleHQubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgXHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJQbHVnaW4iLCJTdGF0ZUZpZWxkIiwiRGVjb3JhdGlvbiIsIkVkaXRvclZpZXciXSwibWFwcGluZ3MiOiI7Ozs7OztNQUFhLFNBQVM7SUFHcEIsWUFBWSxXQUF3QjtRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztLQUNoQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDOzs7TUNPa0IsZUFBZ0IsU0FBUUEsZUFBTTs7Ozs7Ozs7Ozs7SUFjakQsTUFBTTtRQUNKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNEUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQkQsaUJBQWlCO1FBRWYsTUFBTSxZQUFZLEdBQUdDLGdCQUFVLENBQUMsTUFBTSxDQUFnQjtZQUNwRCxNQUFNLENBQUMsS0FBa0I7Z0JBQ3ZCLE9BQVFDLGVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDekI7WUFDRCxNQUFNLENBQUMsT0FBc0IsRUFBRSxFQUFlO2dCQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDbkIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ3JCLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztxQkFDckM7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ25FLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7cUJBQ3JDO2lCQUNGO2dCQUVELGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXRDLE9BQU8sT0FBTyxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxFQUFFLENBQUMsQ0FBTSxLQUFLQyxlQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzVDO0lBRUQsT0FBTyxlQUFlLENBQUMsSUFBWTtRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssVUFBVSxLQUFLLGFBQWEsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsT0FBTyxZQUFZLENBQUMsSUFBWTtRQUM5QixNQUFNLG1CQUFtQixHQUN2QixnbUlBQWdtSTthQUM3bEksTUFBTSxDQUFDO1FBQ1osTUFBTSxzQkFBc0IsR0FDMUIsbUVBQW1FLENBQUMsTUFBTSxDQUFDO1FBRTdFLE1BQU0sMkJBQTJCLEdBQy9CLHdFQUF3RTthQUNyRSxNQUFNLENBQUM7UUFFWixNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FDeEI7WUFDRSxxQ0FBcUMsbUJBQW1CLEtBQUs7WUFDN0Qsc0JBQXNCO1lBQ3RCLDJCQUEyQjtTQUM1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDWCxHQUFHLENBQ0osQ0FBQztRQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUM7S0FDM0M7SUFFRCxPQUFPLGlCQUFpQixDQUFDLElBQVk7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OzsifQ==