import {
    property,
    subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import { ApplicationConfig } from "./_applicationBase/interfaces";

import { allItemTypes, ItemType, ItemTypeFilter } from "./_utils";

type UIPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-leading"
    | "top-trailing"
    | "bottom-leading"
    | "bottom-trailing";

@subclass("app.ConfigurationSettings")
class ConfigurationSettings extends Accessor {
    @property()
    group: string;

    @property()
    title: string;

    @property()
    displayDefault: string;

    @property()
    headHTML: string;

    @property()
    customCSS: string;

    @property()
    filterPaneDefault: boolean;

    @property()
    allowedItemTypes: string;

    @property()
    allowedItemTypesArray: ItemType[];

    @property()
    resultsPerQuery: number;

    @property()
    showSignInBtn: boolean;

    @property()
    filters: string[];

    @property()
    filtersDefault: string[];

    @property()
    availableItemTypeFilters: ItemTypeFilter[];

    @property()
    useOrgCategories: boolean;

    @property()
    showItemType: boolean;

    @property()
    showItemOwner: boolean;

    @property()
    showItemInfo: boolean;

    @property()
    showItemDetails: boolean;

    @property()
    showItemToolTip: boolean;

    @property()
    itemSummaryMaxChar: number;

    @property()
    defaultBasemap: string;

    @property()
    compassWidget: boolean;

    @property()
    compassWidgetPosition: UIPosition;

    @property()
    basemapToggle: boolean;

    @property()
    basemapTogglePosition: UIPosition;

    @property()
    nextBasemap: string;

    @property()
    search: boolean;

    @property()
    searchPosition: UIPosition;

    @property()
    locateWidget: boolean;

    @property()
    locateWidgetPosition: UIPosition;

    @property()
    home: boolean;

    @property()
    homePosition: UIPosition;

    @property()
    legend: boolean;

    @property()
    legendPosition: UIPosition;

    // @property()
    // searchConfiguration: any;

    @property()
    share: boolean;

    @property()
    googleAnalytics: boolean;
    @property()
    googleAnalyticsKey: string;
    @property()
    googleAnalyticsConsentMsg: string;
    @property()
    googleAnalyticsConsent: boolean;
    @property()
    telemetry: any;

    @property()
    theme: string;

    @property()
    withinConfigurationExperience: boolean =
        window?.frameElement?.getAttribute("data-embed-type") === "instant-config";

    @property()
    draftChanges: boolean;

    _storageKey = "config-values";
    _draft: ApplicationConfig = {};
    _draftMode: boolean = false;
    constructor(params?: ApplicationConfig) {

        super(params);
        this._draft = params?.draft;
        this._draftMode = params?.mode === "draft";
    }
    initialize() {
        if (this.withinConfigurationExperience || this._draftMode) {
            // Apply any draft properties
            if (this._draft) {
                Object.assign(this, this._draft);
            }

            window.addEventListener(
                "message",
                ((e: MessageEvent) => {
                    this._handleConfigurationUpdates(e);
                }).bind(this),
                false
            );
        }
    }

    _handleConfigurationUpdates(e: MessageEvent) {
        if (e?.data?.type === "cats-app") {
            Object.assign(this, e.data);
            window.postMessage({type: "rerender"}, window.origin);
        }
    }
}
export default ConfigurationSettings;