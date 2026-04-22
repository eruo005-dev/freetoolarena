import type { ReactElement } from "react";
import dynamic from "next/dynamic";

/**
 * Every tool ships as its own JS chunk. Importing a single tool pulls in
 * only that tool's component — not all 50. The `ssr: true` default keeps
 * initial HTML pre-rendered so pages stay SEO-friendly and there's no
 * hydration flash. The skeleton renders during chunk fetch on client nav.
 */
const Skeleton = () => (
  <div
    aria-hidden
    className="h-64 w-full animate-pulse rounded-xl bg-slate-100"
  />
);

const TipCalculator = dynamic(() => import("./TipCalculator").then(m => ({ default: m.TipCalculator })), { loading: Skeleton });
const PomodoroTimer = dynamic(() => import("./PomodoroTimer").then(m => ({ default: m.PomodoroTimer })), { loading: Skeleton });
const BudgetCalculator = dynamic(() => import("./BudgetCalculator").then(m => ({ default: m.BudgetCalculator })), { loading: Skeleton });
const WordCounter = dynamic(() => import("./WordCounter").then(m => ({ default: m.WordCounter })), { loading: Skeleton });
const JsonFormatter = dynamic(() => import("./JsonFormatter").then(m => ({ default: m.JsonFormatter })), { loading: Skeleton });
const CharacterCounter = dynamic(() => import("./CharacterCounter").then(m => ({ default: m.CharacterCounter })), { loading: Skeleton });
const CountdownTimer = dynamic(() => import("./CountdownTimer").then(m => ({ default: m.CountdownTimer })), { loading: Skeleton });
const PasswordGenerator = dynamic(() => import("./PasswordGenerator").then(m => ({ default: m.PasswordGenerator })), { loading: Skeleton });
const Stopwatch = dynamic(() => import("./Stopwatch").then(m => ({ default: m.Stopwatch })), { loading: Skeleton });
const CaseConverter = dynamic(() => import("./CaseConverter").then(m => ({ default: m.CaseConverter })), { loading: Skeleton });
const SlugGenerator = dynamic(() => import("./SlugGenerator").then(m => ({ default: m.SlugGenerator })), { loading: Skeleton });
const LoremIpsumGenerator = dynamic(() => import("./LoremIpsumGenerator").then(m => ({ default: m.LoremIpsumGenerator })), { loading: Skeleton });
const UnitConverter = dynamic(() => import("./UnitConverter").then(m => ({ default: m.UnitConverter })), { loading: Skeleton });
const TemperatureConverter = dynamic(() => import("./TemperatureConverter").then(m => ({ default: m.TemperatureConverter })), { loading: Skeleton });
const BmiCalculator = dynamic(() => import("./BmiCalculator").then(m => ({ default: m.BmiCalculator })), { loading: Skeleton });
const CalorieCalculator = dynamic(() => import("./CalorieCalculator").then(m => ({ default: m.CalorieCalculator })), { loading: Skeleton });
const WaterIntakeCalculator = dynamic(() => import("./WaterIntakeCalculator").then(m => ({ default: m.WaterIntakeCalculator })), { loading: Skeleton });
const CoinFlip = dynamic(() => import("./CoinFlip").then(m => ({ default: m.CoinFlip })), { loading: Skeleton });
const DiceRoller = dynamic(() => import("./DiceRoller").then(m => ({ default: m.DiceRoller })), { loading: Skeleton });
const AgeCalculator = dynamic(() => import("./AgeCalculator").then(m => ({ default: m.AgeCalculator })), { loading: Skeleton });
const LoanCalculator = dynamic(() => import("./LoanCalculator").then(m => ({ default: m.LoanCalculator })), { loading: Skeleton });
const MortgageCalculator = dynamic(() => import("./MortgageCalculator").then(m => ({ default: m.MortgageCalculator })), { loading: Skeleton });
const CompoundInterestCalculator = dynamic(() => import("./CompoundInterestCalculator").then(m => ({ default: m.CompoundInterestCalculator })), { loading: Skeleton });
const SavingsGoalCalculator = dynamic(() => import("./SavingsGoalCalculator").then(m => ({ default: m.SavingsGoalCalculator })), { loading: Skeleton });
const DebtPayoffCalculator = dynamic(() => import("./DebtPayoffCalculator").then(m => ({ default: m.DebtPayoffCalculator })), { loading: Skeleton });
const ToDoList = dynamic(() => import("./ToDoList").then(m => ({ default: m.ToDoList })), { loading: Skeleton });
const TextReverser = dynamic(() => import("./TextReverser").then(m => ({ default: m.TextReverser })), { loading: Skeleton });
const Base64EncoderDecoder = dynamic(() => import("./Base64EncoderDecoder").then(m => ({ default: m.Base64EncoderDecoder })), { loading: Skeleton });
const UrlEncoderDecoder = dynamic(() => import("./UrlEncoderDecoder").then(m => ({ default: m.UrlEncoderDecoder })), { loading: Skeleton });
const UuidGenerator = dynamic(() => import("./UuidGenerator").then(m => ({ default: m.UuidGenerator })), { loading: Skeleton });
const RandomNumberGenerator = dynamic(() => import("./RandomNumberGenerator").then(m => ({ default: m.RandomNumberGenerator })), { loading: Skeleton });
const RandomNameGenerator = dynamic(() => import("./RandomNameGenerator").then(m => ({ default: m.RandomNameGenerator })), { loading: Skeleton });
const DecisionMaker = dynamic(() => import("./DecisionMaker").then(m => ({ default: m.DecisionMaker })), { loading: Skeleton });
const LengthConverter = dynamic(() => import("./LengthConverter").then(m => ({ default: m.LengthConverter })), { loading: Skeleton });
const SpeedConverter = dynamic(() => import("./SpeedConverter").then(m => ({ default: m.SpeedConverter })), { loading: Skeleton });
const ReadabilityScoreChecker = dynamic(() => import("./ReadabilityScoreChecker").then(m => ({ default: m.ReadabilityScoreChecker })), { loading: Skeleton });
const TypingSpeedTest = dynamic(() => import("./TypingSpeedTest").then(m => ({ default: m.TypingSpeedTest })), { loading: Skeleton });
const JsonToCsv = dynamic(() => import("./JsonToCsv").then(m => ({ default: m.JsonToCsv })), { loading: Skeleton });
const MarkdownToHtml = dynamic(() => import("./MarkdownToHtml").then(m => ({ default: m.MarkdownToHtml })), { loading: Skeleton });
const RegexTester = dynamic(() => import("./RegexTester").then(m => ({ default: m.RegexTester })), { loading: Skeleton });
const PaycheckCalculator = dynamic(() => import("./PaycheckCalculator").then(m => ({ default: m.PaycheckCalculator })), { loading: Skeleton });
const RoiCalculator = dynamic(() => import("./RoiCalculator").then(m => ({ default: m.RoiCalculator })), { loading: Skeleton });
const CurrencyConverter = dynamic(() => import("./CurrencyConverter").then(m => ({ default: m.CurrencyConverter })), { loading: Skeleton });
const HabitTracker = dynamic(() => import("./HabitTracker").then(m => ({ default: m.HabitTracker })), { loading: Skeleton });
const ReadingTimeEstimator = dynamic(() => import("./ReadingTimeEstimator").then(m => ({ default: m.ReadingTimeEstimator })), { loading: Skeleton });
const MeetingCostCalculator = dynamic(() => import("./MeetingCostCalculator").then(m => ({ default: m.MeetingCostCalculator })), { loading: Skeleton });
const TimeZoneConverter = dynamic(() => import("./TimeZoneConverter").then(m => ({ default: m.TimeZoneConverter })), { loading: Skeleton });
const IdealWeightCalculator = dynamic(() => import("./IdealWeightCalculator").then(m => ({ default: m.IdealWeightCalculator })), { loading: Skeleton });
const RunningPaceCalculator = dynamic(() => import("./RunningPaceCalculator").then(m => ({ default: m.RunningPaceCalculator })), { loading: Skeleton });
const MacroCalculator = dynamic(() => import("./MacroCalculator").then(m => ({ default: m.MacroCalculator })), { loading: Skeleton });
// Wave 1 — converters (pure JS, no external deps)
const ColorConverter = dynamic(() => import("./ColorConverter").then(m => ({ default: m.ColorConverter })), { loading: Skeleton });
const UnixTimestampConverter = dynamic(() => import("./UnixTimestampConverter").then(m => ({ default: m.UnixTimestampConverter })), { loading: Skeleton });
const NumberBaseConverter = dynamic(() => import("./NumberBaseConverter").then(m => ({ default: m.NumberBaseConverter })), { loading: Skeleton });
const CsvToJson = dynamic(() => import("./CsvToJson").then(m => ({ default: m.CsvToJson })), { loading: Skeleton });
const YamlJsonConverter = dynamic(() => import("./YamlJsonConverter").then(m => ({ default: m.YamlJsonConverter })), { loading: Skeleton });
// Wave 2 — converters (browser-native: DOMParser, Canvas)
const HtmlToMarkdown = dynamic(() => import("./HtmlToMarkdown").then(m => ({ default: m.HtmlToMarkdown })), { loading: Skeleton });
const ImageFormatConverter = dynamic(() => import("./ImageFormatConverter").then(m => ({ default: m.ImageFormatConverter })), { loading: Skeleton });
const ImageResizer = dynamic(() => import("./ImageResizer").then(m => ({ default: m.ImageResizer })), { loading: Skeleton });
const ImageCompressor = dynamic(() => import("./ImageCompressor").then(m => ({ default: m.ImageCompressor })), { loading: Skeleton });
const SvgToPng = dynamic(() => import("./SvgToPng").then(m => ({ default: m.SvgToPng })), { loading: Skeleton });
// Wave 3 — converters (heavy libs: pdfjs-dist, pdf-lib, heic2any)
const PdfToText = dynamic(() => import("./PdfToText").then(m => ({ default: m.PdfToText })), { loading: Skeleton });
const PdfToJpg = dynamic(() => import("./PdfToJpg").then(m => ({ default: m.PdfToJpg })), { loading: Skeleton });
const JpgToPdf = dynamic(() => import("./JpgToPdf").then(m => ({ default: m.JpgToPdf })), { loading: Skeleton });
const MergePdf = dynamic(() => import("./MergePdf").then(m => ({ default: m.MergePdf })), { loading: Skeleton });
const HeicToJpg = dynamic(() => import("./HeicToJpg").then(m => ({ default: m.HeicToJpg })), { loading: Skeleton });
// Wave 4 — free-API tools (ipify, ipapi, Nager.Date, HIBP)
const IpLookup = dynamic(() => import("./IpLookup").then(m => ({ default: m.IpLookup })), { loading: Skeleton });
const PublicHolidays = dynamic(() => import("./PublicHolidays").then(m => ({ default: m.PublicHolidays })), { loading: Skeleton });
const PasswordBreachChecker = dynamic(() => import("./PasswordBreachChecker").then(m => ({ default: m.PasswordBreachChecker })), { loading: Skeleton });
// Wave 5 — parity pass: PDF suite
const PdfSplit = dynamic(() => import("./PdfSplit").then(m => ({ default: m.PdfSplit })), { loading: Skeleton });
const PdfMetadataViewer = dynamic(() => import("./PdfMetadataViewer").then(m => ({ default: m.PdfMetadataViewer })), { loading: Skeleton });
const PdfMetadataRemover = dynamic(() => import("./PdfMetadataRemover").then(m => ({ default: m.PdfMetadataRemover })), { loading: Skeleton });
const PdfToLongImage = dynamic(() => import("./PdfToLongImage").then(m => ({ default: m.PdfToLongImage })), { loading: Skeleton });
const PdfWatermark = dynamic(() => import("./PdfWatermark").then(m => ({ default: m.PdfWatermark })), { loading: Skeleton });
const PdfOrganizer = dynamic(() => import("./PdfOrganizer").then(m => ({ default: m.PdfOrganizer })), { loading: Skeleton });
const PdfPageNumbers = dynamic(() => import("./PdfPageNumbers").then(m => ({ default: m.PdfPageNumbers })), { loading: Skeleton });
const PdfCrop = dynamic(() => import("./PdfCrop").then(m => ({ default: m.PdfCrop })), { loading: Skeleton });
// Wave 5 — parity pass: image suite
const WebpToJpg = dynamic(() => import("./WebpToJpg").then(m => ({ default: m.WebpToJpg })), { loading: Skeleton });
const ImageCropper = dynamic(() => import("./ImageCropper").then(m => ({ default: m.ImageCropper })), { loading: Skeleton });
const ColorExtractor = dynamic(() => import("./ColorExtractor").then(m => ({ default: m.ColorExtractor })), { loading: Skeleton });
const GifMaker = dynamic(() => import("./GifMaker").then(m => ({ default: m.GifMaker })), { loading: Skeleton });
// Wave 5 — parity pass: dev + utility
const QrCodeGenerator = dynamic(() => import("./QrCodeGenerator").then(m => ({ default: m.QrCodeGenerator })), { loading: Skeleton });
const AgeGapCalculator = dynamic(() => import("./AgeGapCalculator").then(m => ({ default: m.AgeGapCalculator })), { loading: Skeleton });
const PercentageCalculator = dynamic(() => import("./PercentageCalculator").then(m => ({ default: m.PercentageCalculator })), { loading: Skeleton });
const HashGenerator = dynamic(() => import("./HashGenerator").then(m => ({ default: m.HashGenerator })), { loading: Skeleton });
const CssMinifier = dynamic(() => import("./CssMinifier").then(m => ({ default: m.CssMinifier })), { loading: Skeleton });
const JsMinifier = dynamic(() => import("./JsMinifier").then(m => ({ default: m.JsMinifier })), { loading: Skeleton });
const XmlFormatter = dynamic(() => import("./XmlFormatter").then(m => ({ default: m.XmlFormatter })), { loading: Skeleton });
const DiffChecker = dynamic(() => import("./DiffChecker").then(m => ({ default: m.DiffChecker })), { loading: Skeleton });
// Wave 6 — full library completion (40 tools)
const TaxCalculator = dynamic(() => import("./TaxCalculator").then(m => ({ default: m.TaxCalculator })), { loading: Skeleton });
const VatCalculator = dynamic(() => import("./VatCalculator").then(m => ({ default: m.VatCalculator })), { loading: Skeleton });
const DiscountCalculator = dynamic(() => import("./DiscountCalculator").then(m => ({ default: m.DiscountCalculator })), { loading: Skeleton });
const ProfitMarginCalculator = dynamic(() => import("./ProfitMarginCalculator").then(m => ({ default: m.ProfitMarginCalculator })), { loading: Skeleton });
const NetWorthCalculator = dynamic(() => import("./NetWorthCalculator").then(m => ({ default: m.NetWorthCalculator })), { loading: Skeleton });
const InflationCalculator = dynamic(() => import("./InflationCalculator").then(m => ({ default: m.InflationCalculator })), { loading: Skeleton });
const BreakEvenCalculator = dynamic(() => import("./BreakEvenCalculator").then(m => ({ default: m.BreakEvenCalculator })), { loading: Skeleton });
const BmrCalculator = dynamic(() => import("./BmrCalculator").then(m => ({ default: m.BmrCalculator })), { loading: Skeleton });
const BodyFatCalculator = dynamic(() => import("./BodyFatCalculator").then(m => ({ default: m.BodyFatCalculator })), { loading: Skeleton });
const PregnancyCalculator = dynamic(() => import("./PregnancyCalculator").then(m => ({ default: m.PregnancyCalculator })), { loading: Skeleton });
const OvulationCalculator = dynamic(() => import("./OvulationCalculator").then(m => ({ default: m.OvulationCalculator })), { loading: Skeleton });
const StepsToCaloriesCalculator = dynamic(() => import("./StepsToCaloriesCalculator").then(m => ({ default: m.StepsToCaloriesCalculator })), { loading: Skeleton });
const WeightConverter = dynamic(() => import("./WeightConverter").then(m => ({ default: m.WeightConverter })), { loading: Skeleton });
const TimeConverter = dynamic(() => import("./TimeConverter").then(m => ({ default: m.TimeConverter })), { loading: Skeleton });
const AreaConverter = dynamic(() => import("./AreaConverter").then(m => ({ default: m.AreaConverter })), { loading: Skeleton });
const VolumeConverter = dynamic(() => import("./VolumeConverter").then(m => ({ default: m.VolumeConverter })), { loading: Skeleton });
const DataSizeConverter = dynamic(() => import("./DataSizeConverter").then(m => ({ default: m.DataSizeConverter })), { loading: Skeleton });
const EnergyConverter = dynamic(() => import("./EnergyConverter").then(m => ({ default: m.EnergyConverter })), { loading: Skeleton });
const FractionCalculator = dynamic(() => import("./FractionCalculator").then(m => ({ default: m.FractionCalculator })), { loading: Skeleton });
const AverageCalculator = dynamic(() => import("./AverageCalculator").then(m => ({ default: m.AverageCalculator })), { loading: Skeleton });
const DateDifferenceCalculator = dynamic(() => import("./DateDifferenceCalculator").then(m => ({ default: m.DateDifferenceCalculator })), { loading: Skeleton });
const TimeDurationCalculator = dynamic(() => import("./TimeDurationCalculator").then(m => ({ default: m.TimeDurationCalculator })), { loading: Skeleton });
const PrimeNumberChecker = dynamic(() => import("./PrimeNumberChecker").then(m => ({ default: m.PrimeNumberChecker })), { loading: Skeleton });
const RatioCalculator = dynamic(() => import("./RatioCalculator").then(m => ({ default: m.RatioCalculator })), { loading: Skeleton });
const JwtDecoder = dynamic(() => import("./JwtDecoder").then(m => ({ default: m.JwtDecoder })), { loading: Skeleton });
const HtmlFormatter = dynamic(() => import("./HtmlFormatter").then(m => ({ default: m.HtmlFormatter })), { loading: Skeleton });
const SqlFormatter = dynamic(() => import("./SqlFormatter").then(m => ({ default: m.SqlFormatter })), { loading: Skeleton });
const PasswordStrengthChecker = dynamic(() => import("./PasswordStrengthChecker").then(m => ({ default: m.PasswordStrengthChecker })), { loading: Skeleton });
const RemoveDuplicateLines = dynamic(() => import("./RemoveDuplicateLines").then(m => ({ default: m.RemoveDuplicateLines })), { loading: Skeleton });
const TextSorter = dynamic(() => import("./TextSorter").then(m => ({ default: m.TextSorter })), { loading: Skeleton });
const UrlCleaner = dynamic(() => import("./UrlCleaner").then(m => ({ default: m.UrlCleaner })), { loading: Skeleton });
const ColorPicker = dynamic(() => import("./ColorPicker").then(m => ({ default: m.ColorPicker })), { loading: Skeleton });
const GradientGenerator = dynamic(() => import("./GradientGenerator").then(m => ({ default: m.GradientGenerator })), { loading: Skeleton });
const BarcodeGenerator = dynamic(() => import("./BarcodeGenerator").then(m => ({ default: m.BarcodeGenerator })), { loading: Skeleton });
const FaviconGenerator = dynamic(() => import("./FaviconGenerator").then(m => ({ default: m.FaviconGenerator })), { loading: Skeleton });
const MetaTagGenerator = dynamic(() => import("./MetaTagGenerator").then(m => ({ default: m.MetaTagGenerator })), { loading: Skeleton });
const RobotsTxtGenerator = dynamic(() => import("./RobotsTxtGenerator").then(m => ({ default: m.RobotsTxtGenerator })), { loading: Skeleton });
const OpenGraphGenerator = dynamic(() => import("./OpenGraphGenerator").then(m => ({ default: m.OpenGraphGenerator })), { loading: Skeleton });
const KeywordDensityChecker = dynamic(() => import("./KeywordDensityChecker").then(m => ({ default: m.KeywordDensityChecker })), { loading: Skeleton });
const BusinessNameGenerator = dynamic(() => import("./BusinessNameGenerator").then(m => ({ default: m.BusinessNameGenerator })), { loading: Skeleton });
// Wave 7 — utility dominance (81 tools)
const TxtSplitter = dynamic(() => import("./TxtSplitter").then(m => ({ default: m.TxtSplitter })), { loading: Skeleton });
const TextJoiner = dynamic(() => import("./TextJoiner").then(m => ({ default: m.TextJoiner })), { loading: Skeleton });
const CsvViewer = dynamic(() => import("./CsvViewer").then(m => ({ default: m.CsvViewer })), { loading: Skeleton });
const CsvCleaner = dynamic(() => import("./CsvCleaner").then(m => ({ default: m.CsvCleaner })), { loading: Skeleton });
const TsvToCsv = dynamic(() => import("./TsvToCsv").then(m => ({ default: m.TsvToCsv })), { loading: Skeleton });
const LineBreakRemover = dynamic(() => import("./LineBreakRemover").then(m => ({ default: m.LineBreakRemover })), { loading: Skeleton });
const WhitespaceRemover = dynamic(() => import("./WhitespaceRemover").then(m => ({ default: m.WhitespaceRemover })), { loading: Skeleton });
const InvisibleCharacterDetector = dynamic(() => import("./InvisibleCharacterDetector").then(m => ({ default: m.InvisibleCharacterDetector })), { loading: Skeleton });
const SpecialCharacterRemover = dynamic(() => import("./SpecialCharacterRemover").then(m => ({ default: m.SpecialCharacterRemover })), { loading: Skeleton });
const UnicodeTextNormalizer = dynamic(() => import("./UnicodeTextNormalizer").then(m => ({ default: m.UnicodeTextNormalizer })), { loading: Skeleton });
const BulletListCleaner = dynamic(() => import("./BulletListCleaner").then(m => ({ default: m.BulletListCleaner })), { loading: Skeleton });
const SentenceCounter = dynamic(() => import("./SentenceCounter").then(m => ({ default: m.SentenceCounter })), { loading: Skeleton });
const ParagraphCounter = dynamic(() => import("./ParagraphCounter").then(m => ({ default: m.ParagraphCounter })), { loading: Skeleton });
const MarkdownTableGenerator = dynamic(() => import("./MarkdownTableGenerator").then(m => ({ default: m.MarkdownTableGenerator })), { loading: Skeleton });
const TableGenerator = dynamic(() => import("./TableGenerator").then(m => ({ default: m.TableGenerator })), { loading: Skeleton });
const XmlToJson = dynamic(() => import("./XmlToJson").then(m => ({ default: m.XmlToJson })), { loading: Skeleton });
const JsonToXml = dynamic(() => import("./JsonToXml").then(m => ({ default: m.JsonToXml })), { loading: Skeleton });
const YamlFormatter = dynamic(() => import("./YamlFormatter").then(m => ({ default: m.YamlFormatter })), { loading: Skeleton });
const JsonDiffChecker = dynamic(() => import("./JsonDiffChecker").then(m => ({ default: m.JsonDiffChecker })), { loading: Skeleton });
const HtmlEntityEncoderDecoder = dynamic(() => import("./HtmlEntityEncoderDecoder").then(m => ({ default: m.HtmlEntityEncoderDecoder })), { loading: Skeleton });
const UtmBuilder = dynamic(() => import("./UtmBuilder").then(m => ({ default: m.UtmBuilder })), { loading: Skeleton });
const UtmParser = dynamic(() => import("./UtmParser").then(m => ({ default: m.UtmParser })), { loading: Skeleton });
const SerpSnippetPreview = dynamic(() => import("./SerpSnippetPreview").then(m => ({ default: m.SerpSnippetPreview })), { loading: Skeleton });
const SchemaMarkupGenerator = dynamic(() => import("./SchemaMarkupGenerator").then(m => ({ default: m.SchemaMarkupGenerator })), { loading: Skeleton });
const FaqSchemaGenerator = dynamic(() => import("./FaqSchemaGenerator").then(m => ({ default: m.FaqSchemaGenerator })), { loading: Skeleton });
const TitleTagLengthChecker = dynamic(() => import("./TitleTagLengthChecker").then(m => ({ default: m.TitleTagLengthChecker })), { loading: Skeleton });
const MetaDescriptionLengthChecker = dynamic(() => import("./MetaDescriptionLengthChecker").then(m => ({ default: m.MetaDescriptionLengthChecker })), { loading: Skeleton });
const HeadlineAnalyzer = dynamic(() => import("./HeadlineAnalyzer").then(m => ({ default: m.HeadlineAnalyzer })), { loading: Skeleton });
const AdCopyLengthChecker = dynamic(() => import("./AdCopyLengthChecker").then(m => ({ default: m.AdCopyLengthChecker })), { loading: Skeleton });
const EmailSubjectLineTester = dynamic(() => import("./EmailSubjectLineTester").then(m => ({ default: m.EmailSubjectLineTester })), { loading: Skeleton });
const AltTextHelper = dynamic(() => import("./AltTextHelper").then(m => ({ default: m.AltTextHelper })), { loading: Skeleton });
const CronExpressionBuilder = dynamic(() => import("./CronExpressionBuilder").then(m => ({ default: m.CronExpressionBuilder })), { loading: Skeleton });
const CronExpressionExplainer = dynamic(() => import("./CronExpressionExplainer").then(m => ({ default: m.CronExpressionExplainer })), { loading: Skeleton });
const HttpStatusCodeLookup = dynamic(() => import("./HttpStatusCodeLookup").then(m => ({ default: m.HttpStatusCodeLookup })), { loading: Skeleton });
const MimeTypeLookup = dynamic(() => import("./MimeTypeLookup").then(m => ({ default: m.MimeTypeLookup })), { loading: Skeleton });
const UrlParser = dynamic(() => import("./UrlParser").then(m => ({ default: m.UrlParser })), { loading: Skeleton });
const QueryStringParser = dynamic(() => import("./QueryStringParser").then(m => ({ default: m.QueryStringParser })), { loading: Skeleton });
const FilenameCleaner = dynamic(() => import("./FilenameCleaner").then(m => ({ default: m.FilenameCleaner })), { loading: Skeleton });
const LineCounter = dynamic(() => import("./LineCounter").then(m => ({ default: m.LineCounter })), { loading: Skeleton });
const BoxShadowGenerator = dynamic(() => import("./BoxShadowGenerator").then(m => ({ default: m.BoxShadowGenerator })), { loading: Skeleton });
const BorderRadiusGenerator = dynamic(() => import("./BorderRadiusGenerator").then(m => ({ default: m.BorderRadiusGenerator })), { loading: Skeleton });
const CssClampGenerator = dynamic(() => import("./CssClampGenerator").then(m => ({ default: m.CssClampGenerator })), { loading: Skeleton });
const FlexboxPlayground = dynamic(() => import("./FlexboxPlayground").then(m => ({ default: m.FlexboxPlayground })), { loading: Skeleton });
const GridLayoutGenerator = dynamic(() => import("./GridLayoutGenerator").then(m => ({ default: m.GridLayoutGenerator })), { loading: Skeleton });
const AspectRatioCalculator = dynamic(() => import("./AspectRatioCalculator").then(m => ({ default: m.AspectRatioCalculator })), { loading: Skeleton });
const ImageDimensionsChecker = dynamic(() => import("./ImageDimensionsChecker").then(m => ({ default: m.ImageDimensionsChecker })), { loading: Skeleton });
const ContrastChecker = dynamic(() => import("./ContrastChecker").then(m => ({ default: m.ContrastChecker })), { loading: Skeleton });
const SocialMediaImageSizes = dynamic(() => import("./SocialMediaImageSizes").then(m => ({ default: m.SocialMediaImageSizes })), { loading: Skeleton });
const MemeTextFormatter = dynamic(() => import("./MemeTextFormatter").then(m => ({ default: m.MemeTextFormatter })), { loading: Skeleton });
const InvoiceGenerator = dynamic(() => import("./InvoiceGenerator").then(m => ({ default: m.InvoiceGenerator })), { loading: Skeleton });
const HourlyRateCalculator = dynamic(() => import("./HourlyRateCalculator").then(m => ({ default: m.HourlyRateCalculator })), { loading: Skeleton });
const FreelanceRateCalculator = dynamic(() => import("./FreelanceRateCalculator").then(m => ({ default: m.FreelanceRateCalculator })), { loading: Skeleton });
const PricingCalculator = dynamic(() => import("./PricingCalculator").then(m => ({ default: m.PricingCalculator })), { loading: Skeleton });
const CashFlowCalculator = dynamic(() => import("./CashFlowCalculator").then(m => ({ default: m.CashFlowCalculator })), { loading: Skeleton });
const StartupRunwayCalculator = dynamic(() => import("./StartupRunwayCalculator").then(m => ({ default: m.StartupRunwayCalculator })), { loading: Skeleton });
const SubscriptionCostCalculator = dynamic(() => import("./SubscriptionCostCalculator").then(m => ({ default: m.SubscriptionCostCalculator })), { loading: Skeleton });
const ExpenseSplitCalculator = dynamic(() => import("./ExpenseSplitCalculator").then(m => ({ default: m.ExpenseSplitCalculator })), { loading: Skeleton });
const BillSplitCalculator = dynamic(() => import("./BillSplitCalculator").then(m => ({ default: m.BillSplitCalculator })), { loading: Skeleton });
const RentSplitCalculator = dynamic(() => import("./RentSplitCalculator").then(m => ({ default: m.RentSplitCalculator })), { loading: Skeleton });
const OvertimeCalculator = dynamic(() => import("./OvertimeCalculator").then(m => ({ default: m.OvertimeCalculator })), { loading: Skeleton });
const PtoCalculator = dynamic(() => import("./PtoCalculator").then(m => ({ default: m.PtoCalculator })), { loading: Skeleton });
const ShiftScheduler = dynamic(() => import("./ShiftScheduler").then(m => ({ default: m.ShiftScheduler })), { loading: Skeleton });
const GpaCalculator = dynamic(() => import("./GpaCalculator").then(m => ({ default: m.GpaCalculator })), { loading: Skeleton });
const GradeCalculator = dynamic(() => import("./GradeCalculator").then(m => ({ default: m.GradeCalculator })), { loading: Skeleton });
const FuelCostCalculator = dynamic(() => import("./FuelCostCalculator").then(m => ({ default: m.FuelCostCalculator })), { loading: Skeleton });
const TripCostCalculator = dynamic(() => import("./TripCostCalculator").then(m => ({ default: m.TripCostCalculator })), { loading: Skeleton });
const SmokingCostCalculator = dynamic(() => import("./SmokingCostCalculator").then(m => ({ default: m.SmokingCostCalculator })), { loading: Skeleton });
const AlcoholUnitCalculator = dynamic(() => import("./AlcoholUnitCalculator").then(m => ({ default: m.AlcoholUnitCalculator })), { loading: Skeleton });
const CaffeineIntakeCalculator = dynamic(() => import("./CaffeineIntakeCalculator").then(m => ({ default: m.CaffeineIntakeCalculator })), { loading: Skeleton });
const SleepCycleCalculator = dynamic(() => import("./SleepCycleCalculator").then(m => ({ default: m.SleepCycleCalculator })), { loading: Skeleton });
const HeartRateZoneCalculator = dynamic(() => import("./HeartRateZoneCalculator").then(m => ({ default: m.HeartRateZoneCalculator })), { loading: Skeleton });
const CookingConverter = dynamic(() => import("./CookingConverter").then(m => ({ default: m.CookingConverter })), { loading: Skeleton });
const RecipeScaler = dynamic(() => import("./RecipeScaler").then(m => ({ default: m.RecipeScaler })), { loading: Skeleton });
const PriorityMatrix = dynamic(() => import("./PriorityMatrix").then(m => ({ default: m.PriorityMatrix })), { loading: Skeleton });
const PackingListGenerator = dynamic(() => import("./PackingListGenerator").then(m => ({ default: m.PackingListGenerator })), { loading: Skeleton });
const DeadlineCalculator = dynamic(() => import("./DeadlineCalculator").then(m => ({ default: m.DeadlineCalculator })), { loading: Skeleton });
const LunchBreakCalculator = dynamic(() => import("./LunchBreakCalculator").then(m => ({ default: m.LunchBreakCalculator })), { loading: Skeleton });
const DailyPlanner = dynamic(() => import("./DailyPlanner").then(m => ({ default: m.DailyPlanner })), { loading: Skeleton });
const WeeklyPlanner = dynamic(() => import("./WeeklyPlanner").then(m => ({ default: m.WeeklyPlanner })), { loading: Skeleton });
const MeetingAgendaBuilder = dynamic(() => import("./MeetingAgendaBuilder").then(m => ({ default: m.MeetingAgendaBuilder })), { loading: Skeleton });
const DecisionWheel = dynamic(() => import("./DecisionWheel").then(m => ({ default: m.DecisionWheel })), { loading: Skeleton });

// ---------- Wave 8: 50 competitor-killer tools ----------
const CaesarCipher = dynamic(() => import("./CaesarCipher").then(m => ({ default: m.CaesarCipher })), { loading: Skeleton });
const MorseCodeTranslator = dynamic(() => import("./MorseCodeTranslator").then(m => ({ default: m.MorseCodeTranslator })), { loading: Skeleton });
const BinaryTextEncoder = dynamic(() => import("./BinaryTextEncoder").then(m => ({ default: m.BinaryTextEncoder })), { loading: Skeleton });
const AsciiArtGenerator = dynamic(() => import("./AsciiArtGenerator").then(m => ({ default: m.AsciiArtGenerator })), { loading: Skeleton });
const RomanNumeralConverter = dynamic(() => import("./RomanNumeralConverter").then(m => ({ default: m.RomanNumeralConverter })), { loading: Skeleton });
const BionicReadingFormatter = dynamic(() => import("./BionicReadingFormatter").then(m => ({ default: m.BionicReadingFormatter })), { loading: Skeleton });
const TextSummarizer = dynamic(() => import("./TextSummarizer").then(m => ({ default: m.TextSummarizer })), { loading: Skeleton });
const Base64ToImage = dynamic(() => import("./Base64ToImage").then(m => ({ default: m.Base64ToImage })), { loading: Skeleton });
const ImageToBase64 = dynamic(() => import("./ImageToBase64").then(m => ({ default: m.ImageToBase64 })), { loading: Skeleton });
const DiscordTimestamp = dynamic(() => import("./DiscordTimestamp").then(m => ({ default: m.DiscordTimestamp })), { loading: Skeleton });
const MockDataGenerator = dynamic(() => import("./MockDataGenerator").then(m => ({ default: m.MockDataGenerator })), { loading: Skeleton });
const JsonToTypescript = dynamic(() => import("./JsonToTypescript").then(m => ({ default: m.JsonToTypescript })), { loading: Skeleton });
const CssToTailwind = dynamic(() => import("./CssToTailwind").then(m => ({ default: m.CssToTailwind })), { loading: Skeleton });
const TailwindToCss = dynamic(() => import("./TailwindToCss").then(m => ({ default: m.TailwindToCss })), { loading: Skeleton });
const HtmlToJsx = dynamic(() => import("./HtmlToJsx").then(m => ({ default: m.HtmlToJsx })), { loading: Skeleton });
const SqlToJson = dynamic(() => import("./SqlToJson").then(m => ({ default: m.SqlToJson })), { loading: Skeleton });
const GitignoreGenerator = dynamic(() => import("./GitignoreGenerator").then(m => ({ default: m.GitignoreGenerator })), { loading: Skeleton });
const ReadmeGenerator = dynamic(() => import("./ReadmeGenerator").then(m => ({ default: m.ReadmeGenerator })), { loading: Skeleton });
const RegexBuilder = dynamic(() => import("./RegexBuilder").then(m => ({ default: m.RegexBuilder })), { loading: Skeleton });
const ExifViewer = dynamic(() => import("./ExifViewer").then(m => ({ default: m.ExifViewer })), { loading: Skeleton });
const ExifRemover = dynamic(() => import("./ExifRemover").then(m => ({ default: m.ExifRemover })), { loading: Skeleton });
const PassportPhotoMaker = dynamic(() => import("./PassportPhotoMaker").then(m => ({ default: m.PassportPhotoMaker })), { loading: Skeleton });
const SignatureDrawer = dynamic(() => import("./SignatureDrawer").then(m => ({ default: m.SignatureDrawer })), { loading: Skeleton });
const ProfilePicCircleCropper = dynamic(() => import("./ProfilePicCircleCropper").then(m => ({ default: m.ProfilePicCircleCropper })), { loading: Skeleton });
const ImageBlurCensor = dynamic(() => import("./ImageBlurCensor").then(m => ({ default: m.ImageBlurCensor })), { loading: Skeleton });
const PhotoCollage = dynamic(() => import("./PhotoCollage").then(m => ({ default: m.PhotoCollage })), { loading: Skeleton });
const MemeGenerator = dynamic(() => import("./MemeGenerator").then(m => ({ default: m.MemeGenerator })), { loading: Skeleton });
const YoutubeThumbnailDownloader = dynamic(() => import("./YoutubeThumbnailDownloader").then(m => ({ default: m.YoutubeThumbnailDownloader })), { loading: Skeleton });
const TweetThreadSplitter = dynamic(() => import("./TweetThreadSplitter").then(m => ({ default: m.TweetThreadSplitter })), { loading: Skeleton });
const UsernameGenerator = dynamic(() => import("./UsernameGenerator").then(m => ({ default: m.UsernameGenerator })), { loading: Skeleton });
const EmailSignatureBuilder = dynamic(() => import("./EmailSignatureBuilder").then(m => ({ default: m.EmailSignatureBuilder })), { loading: Skeleton });
const CertificateGenerator = dynamic(() => import("./CertificateGenerator").then(m => ({ default: m.CertificateGenerator })), { loading: Skeleton });
const BusinessCardDesigner = dynamic(() => import("./BusinessCardDesigner").then(m => ({ default: m.BusinessCardDesigner })), { loading: Skeleton });
const ResumeSkeletonBuilder = dynamic(() => import("./ResumeSkeletonBuilder").then(m => ({ default: m.ResumeSkeletonBuilder })), { loading: Skeleton });
const CoverLetterBuilder = dynamic(() => import("./CoverLetterBuilder").then(m => ({ default: m.CoverLetterBuilder })), { loading: Skeleton });
const ImageToText = dynamic(() => import("./ImageToText").then(m => ({ default: m.ImageToText })), { loading: Skeleton });
const HandwritingToText = dynamic(() => import("./HandwritingToText").then(m => ({ default: m.HandwritingToText })), { loading: Skeleton });
const VoiceRecorder = dynamic(() => import("./VoiceRecorder").then(m => ({ default: m.VoiceRecorder })), { loading: Skeleton });
const AudioTrimmer = dynamic(() => import("./AudioTrimmer").then(m => ({ default: m.AudioTrimmer })), { loading: Skeleton });
const AudioSilenceRemover = dynamic(() => import("./AudioSilenceRemover").then(m => ({ default: m.AudioSilenceRemover })), { loading: Skeleton });
const AudioSpeedChanger = dynamic(() => import("./AudioSpeedChanger").then(m => ({ default: m.AudioSpeedChanger })), { loading: Skeleton });
const AudioPitchChanger = dynamic(() => import("./AudioPitchChanger").then(m => ({ default: m.AudioPitchChanger })), { loading: Skeleton });
const VideoTrimmer = dynamic(() => import("./VideoTrimmer").then(m => ({ default: m.VideoTrimmer })), { loading: Skeleton });
const VideoToGif = dynamic(() => import("./VideoToGif").then(m => ({ default: m.VideoToGif })), { loading: Skeleton });
const VideoMute = dynamic(() => import("./VideoMute").then(m => ({ default: m.VideoMute })), { loading: Skeleton });
const VideoFrameExtractor = dynamic(() => import("./VideoFrameExtractor").then(m => ({ default: m.VideoFrameExtractor })), { loading: Skeleton });
const ScreenRecorder = dynamic(() => import("./ScreenRecorder").then(m => ({ default: m.ScreenRecorder })), { loading: Skeleton });
const TextToSpeech = dynamic(() => import("./TextToSpeech").then(m => ({ default: m.TextToSpeech })), { loading: Skeleton });
const SpeechToText = dynamic(() => import("./SpeechToText").then(m => ({ default: m.SpeechToText })), { loading: Skeleton });
const VoiceNoteTranscriber = dynamic(() => import("./VoiceNoteTranscriber").then(m => ({ default: m.VoiceNoteTranscriber })), { loading: Skeleton });

// ---------- Wave 9: AI & prompt tools (10) ----------
const AiPromptGenerator = dynamic(() => import("./AiPromptGenerator").then(m => ({ default: m.AiPromptGenerator })), { loading: Skeleton });
const AiPromptLibrary = dynamic(() => import("./AiPromptLibrary").then(m => ({ default: m.AiPromptLibrary })), { loading: Skeleton });
const ChatPromptBuilder = dynamic(() => import("./ChatPromptBuilder").then(m => ({ default: m.ChatPromptBuilder })), { loading: Skeleton });
const AiImagePromptBuilder = dynamic(() => import("./AiImagePromptBuilder").then(m => ({ default: m.AiImagePromptBuilder })), { loading: Skeleton });
const AiArtStylePicker = dynamic(() => import("./AiArtStylePicker").then(m => ({ default: m.AiArtStylePicker })), { loading: Skeleton });
const AiTokenCounter = dynamic(() => import("./AiTokenCounter").then(m => ({ default: m.AiTokenCounter })), { loading: Skeleton });
const AiModelCompare = dynamic(() => import("./AiModelCompare").then(m => ({ default: m.AiModelCompare })), { loading: Skeleton });
const PromptImprover = dynamic(() => import("./PromptImprover").then(m => ({ default: m.PromptImprover })), { loading: Skeleton });
const AiChatExportFormatter = dynamic(() => import("./AiChatExportFormatter").then(m => ({ default: m.AiChatExportFormatter })), { loading: Skeleton });
const AiWritingHumanizer = dynamic(() => import("./AiWritingHumanizer").then(m => ({ default: m.AiWritingHumanizer })), { loading: Skeleton });

/** Next passes `searchParams` as `string | string[] | undefined`. */
export type RenderParams = Record<string, string | string[] | undefined>;

export interface ToolEntry {
  /**
   * The interactive UI. Must already include `'use client'` if interactive.
   * Optional `params` object comes from the page's `searchParams` — tools
   * that support deep links (e.g. ?amount=25000) read their defaults here.
   */
  render: (params?: RenderParams) => ReactElement;
  /** 150-300 word explainer shown under the tool. */
  explainer: ReactElement;
  /** Numbered "how to use" steps. */
  howToUse: string[];
  /** Optional: short "Common use cases" bullet list. */
  useCases?: string[];
  /** Optional: "When to reach for this tool" bullets. */
  whenToUse?: string[];
  /** Optional: "When NOT to use this tool" bullets. Stops misuse. */
  whenNotToUse?: string[];
  /** Optional: concrete input/output example rendered in a styled card. */
  example?: { input: string; output: string; note?: string };
  /** Optional: plain-English "how it works" — algorithm, formula, limits. */
  howItWorks?: ReactElement;
  /** Optional: question/answer pairs. Auto-emits FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
}

/** Parse a searchParam as a finite number, falling back to undefined. */
function num(params: RenderParams | undefined, key: string): number | undefined {
  const raw = params?.[key];
  if (typeof raw !== "string") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export const TOOL_REGISTRY: Record<string, ToolEntry> = {
  "tip-calculator": {
    render: (params) => (
      <TipCalculator
        initialBill={num(params, "bill")}
        initialTip={num(params, "tip")}
        initialPeople={num(params, "people")}
      />
    ),
    explainer: (
      <>
        <p>
          Our tip calculator does one job well: turn a bill, a tip percent, and a party size into
          a clean per-person total in under a second. Type the bill amount, pick a tip (or tap one of
          the presets), and split across any number of people. Everything runs in your browser —
          nothing is sent anywhere, there are no ads, and it works offline once the page loads.
        </p>
        <p>
          Tipping norms vary by country and service type. In the US, 18–20% is standard for table
          service; 10–15% is typical for takeout and delivery; cafes and bars often see $1 per drink
          or 10–15% of the tab. Many European countries add service automatically; a few dollars on
          top is enough. The presets reflect US norms — override them whenever it makes sense.
        </p>
      </>
    ),
    howToUse: [
      "Enter the bill amount (pre-tip).",
      "Pick a tip percentage — tap a preset or type a custom value.",
      "Set the number of people splitting the bill.",
      "Read the per-person total in the highlighted box.",
    ],
    useCases: [
      "Splitting a restaurant bill at dinner.",
      "Working out delivery / takeout tips quickly.",
      "Settling the group tab at a bar or cafe.",
      "Teaching someone how tip math actually works.",
    ],
    whenToUse: [
      "You know the pre-tax total and want a per-person number in seconds.",
      "You're splitting unevenly and want to sanity-check before Venmo.",
      "You're in a country with different tipping norms and want to start from a clean percentage.",
    ],
    whenNotToUse: [
      "You need a line-by-line bill splitter (different orders per person). Use a dedicated bill splitter instead.",
      "You need tax calculated on top — this tool tips on the amount you enter; add tax first or use a tax-inclusive bill.",
    ],
    example: {
      input: "Bill: $84.50\nTip: 18%\nPeople: 3",
      output: "Tip: $15.21\nTotal: $99.71\nPer person: $33.24",
      note: "Presets reflect US norms. 15% = fine service, 18–20% = standard, 25%+ = above-and-beyond.",
    },
    faq: [
      {
        q: "Should I tip on the pre-tax or post-tax amount?",
        a: "Etiquette guides say pre-tax; most Americans tip on the full total out of habit. The difference on a $100 meal at 8% tax is about $1.40 at 18% — pick a policy and be consistent.",
      },
      {
        q: "Is a 'service charge' the same as a tip?",
        a: "Not always. If the bill already includes a service charge (common in the UK, Europe, and a growing number of US restaurants), tipping on top is optional. Check the bill.",
      },
    ],
  },
  "pomodoro-timer": {
    render: () => <PomodoroTimer />,
    explainer: (
      <>
        <p>
          This is a free online pomodoro timer that follows the classic rhythm: 25 minutes of focus,
          5 minutes of break, and a longer 15-minute break every four focus rounds. Tap Start,
          silence your notifications, and go. It runs entirely in your browser, so your streak is
          private and there's nothing to install.
        </p>
        <p>
          The pomodoro technique works because it splits vague "work on it" into clear sprints with a
          deadline. You only have to decide the next 25 minutes — the break is guaranteed. Try
          pairing each focus round with one specific task, not a to-do list. If 25 minutes feels
          short or long, swap to your own rhythm by starting and pausing whenever you like.
        </p>
      </>
    ),
    howToUse: [
      "Close distracting tabs and silence your phone.",
      "Tap Start — the focus session runs for 25 minutes.",
      "When the timer ends, take the 5-minute break (or 15-minute after every 4th round).",
      "Repeat. Aim for 4 focus rounds in a sitting before a longer stop.",
    ],
    useCases: [
      "Deep-work sprints on writing, coding, studying.",
      "Breaking down a dreaded task into concrete 25-minute units.",
      "Timeboxing creative work so breaks are guaranteed, not deferred.",
    ],
    whenToUse: [
      "You're avoiding a task and need a small, finite commitment.",
      "You lose time to context-switching and want forced breaks.",
      "You're pair-programming or studying with someone and want a shared rhythm.",
    ],
    whenNotToUse: [
      "You're already in flow — interrupting yourself breaks a good thing.",
      "The task is genuinely 5 minutes. Just do it.",
      "Your work needs continuous attention (live ops, a surgery, a driving lesson).",
    ],
    example: {
      input: "Tap Start",
      output: "25:00 focus → 05:00 break → 25:00 focus → 05:00 break → 25:00 focus → 05:00 break → 25:00 focus → 15:00 long break",
      note: "One 'set' = 4 focus rounds + 1 long break. Aim for 2–3 sets per day, not 8.",
    },
      faq: [
      {
        "q": "Why 25 minutes?",
        "a": "Francesco Cirillo chose 25 minutes in the 1980s as a length long enough for meaningful work but short enough that the brain accepts the discomfort. You can tune it — 50/10 works well for deep coding sessions — but 25/5 is a proven default for most knowledge work."
      },
      {
        "q": "Does the timer keep running in a background tab?",
        "a": "Yes. Browsers throttle inactive tabs but the countdown uses timestamps, not ticks, so it stays accurate. You can switch tabs, lock the screen, or even close the laptop lid and the elapsed time remains correct when you come back."
      },
      {
        "q": "Should I take the break even if I'm in flow?",
        "a": "For single sessions, finishing the thought is fine. But taking the break prevents the late-afternoon fatigue that costs you two low-quality hours later. Short breaks are the reason Pomodoro produces more output per day, not less."
      },
      {
        "q": "How many Pomodoros should I do per day?",
        "a": "Eight to twelve is the practical ceiling for deep knowledge work. Past that, quality drops sharply. If you consistently hit ten in a day, you're doing better than most salaried engineers."
      }
    ],
  },
  "budget-calculator": {
    render: () => <BudgetCalculator />,
    explainer: (
      <>
        <p>
          A monthly budget calculator that shows, at a glance, whether you&rsquo;re actually saving
          money. Enter your take-home pay, fill in your real expense categories, and see income,
          expenses, leftover, and savings rate — plus a color-coded bar so you know where you stand
          without reading a spreadsheet.
        </p>
        <p>
          A healthy starting target is 20% of income into savings. 10–20% is reasonable; under 10%
          means one surprise expense knocks you over; negative means spending is outrunning income
          and needs urgent attention. The defaults are realistic US numbers — override every field
          with your own to get a picture that reflects your real life.
        </p>
      </>
    ),
    howToUse: [
      "Enter your monthly take-home pay (after tax).",
      "Fill in each expense row with a typical month's figure.",
      "Read the leftover amount and savings rate.",
      "Adjust until you're saving at least 10–20%.",
    ],
    useCases: [
      "Monthly planning — see where your paycheck actually goes.",
      "Before a big decision (new rent, new car) — stress-test the number.",
      "Finding the $50–200/month drain that's hiding in a category.",
    ],
    whenToUse: [
      "You want a one-screen snapshot, not a spreadsheet.",
      "You're comparing two possible monthly setups (e.g. two apartments).",
      "You're starting a budget for the first time and need a shape to aim at.",
    ],
    whenNotToUse: [
      "You need multi-month cash-flow forecasting — use a proper spreadsheet.",
      "You need debt-snowball vs. avalanche modeling — use the debt payoff calculator.",
    ],
    example: {
      input: "Take-home: $4,200\nRent: $1,400\nGroceries: $450\nUtilities: $180\nTransport: $220\nSubscriptions: $90\nOther: $600",
      output: "Total expenses: $2,940\nLeftover: $1,260\nSavings rate: 30%",
      note: "Above 20% is a strong savings rate. Under 10% means one surprise expense knocks you over.",
    },
      faq: [
      {
        "q": "What is the 50/30/20 rule?",
        "a": "A simple budget split: 50 percent of take-home pay covers needs (rent, groceries, insurance), 30 percent covers wants (eating out, subscriptions, travel), and 20 percent goes to savings and debt payoff beyond the minimum. It works as a starting point for most incomes."
      },
      {
        "q": "Should I use gross or net income?",
        "a": "Use net (take-home) income — what actually hits your account after taxes and benefits. Budgeting off gross income consistently leads to month-end shortfalls because you can't spend tax money."
      },
      {
        "q": "My savings rate is under 10 percent. Is that bad?",
        "a": "It means one unexpected expense knocks you over. Prioritize trimming wants first since that's the bucket with the most flexibility — one $12/mo subscription you don't use is a $144/year raise to savings."
      },
      {
        "q": "Does this work for irregular freelance income?",
        "a": "Yes — use your average monthly take-home over the last twelve months, and treat the 20 percent savings bucket as a runway fund rather than long-term savings until you have six months of expenses set aside."
      }
    ],
  },
  "word-counter": {
    render: () => <WordCounter />,
    explainer: (
      <>
        <p>
          A fast, free word counter with the stats that matter for writing online: words, characters
          (with and without spaces), sentences, paragraphs, plus reading and speaking time estimates
          based on average adult speeds. Paste any text — nothing is sent to a server.
        </p>
        <p>
          Character counts are useful for meta descriptions (~160), tweets (280), and SMS (160).
          Word counts matter for blog posts (800–1500 usually performs best), essays, and scripts.
          Reading time is calculated at 230 words per minute (the adult average); speaking time at
          130 wpm, which matches relaxed presentation pace.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Stats update live — no button to press.",
      "Use Reading and Speaking time to plan posts, presentations, or scripts.",
      "Clear or copy the text with the buttons below the stat grid.",
    ],
    useCases: [
      "Staying under a meta description limit (≤160 chars).",
      "Hitting a Twitter / X or SMS length (280 / 160 chars).",
      "Essay word counts for school submissions.",
      "Estimating presentation length before you record.",
      "Checking that a blog post fits a target word range.",
    ],
    whenToUse: [
      "You care about character limits or estimated reading time.",
      "You want sentence/paragraph counts, not just words.",
      "You need a second opinion on Word's or Docs's word count (they sometimes disagree).",
    ],
    whenNotToUse: [
      "You need grammar checks — use a grammar tool.",
      "You need a keyword density report — use a content analyzer.",
    ],
    example: {
      input: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
      output: "Words: 17\nCharacters: 86 (with spaces) / 70 (no spaces)\nSentences: 2\nParagraphs: 1\nReading time: ~4s\nSpeaking time: ~8s",
    },
    faq: [
      {
        q: "Why does my count differ from Google Docs or Word?",
        a: "Different apps handle hyphens, em dashes, and URLs differently. A hyphenated word like 'well-being' might be 1 word or 2 depending on the tool. Differences of 1–3% are normal.",
      },
      {
        q: "Is the text sent to a server?",
        a: "No. The entire count is computed in your browser as you type. You can open DevTools' Network tab to verify — no outgoing requests.",
      },
    ],
  },
  "json-formatter": {
    render: () => <JsonFormatter />,
    explainer: (
      <>
        <p>
          A no-fuss JSON formatter: paste any JSON, get it pretty-printed, minified, or validated
          with a clear error message. It runs entirely in your browser — your data never leaves the
          tab, which matters when you&rsquo;re pasting real API responses or internal payloads.
        </p>
        <p>
          Use <strong>Format</strong> when reading responses from an API, <strong>Minify</strong>{" "}
          when embedding JSON in a config file or URL, and <strong>Validate</strong> when
          you&rsquo;re sanity-checking a payload before sending it. Error messages show the first
          thing JavaScript&rsquo;s built-in parser complains about — usually a missing comma, an
          unquoted key, or a trailing comma.
        </p>
      </>
    ),
    howToUse: [
      "Paste JSON (valid or not) into the input box.",
      "Click Format for pretty-printed output with 2 or 4-space indent.",
      "Click Minify to strip whitespace for config files or URLs.",
      "Click Validate just to confirm structure without changing output.",
    ],
    useCases: [
      "Reading a raw API response that came back on one line.",
      "Minifying a config payload before pasting into a URL or env var.",
      "Finding the exact character where a JSON parser is failing.",
      "Sharing a clean snippet in a code review or bug report.",
    ],
    whenToUse: [
      "You want to read/debug JSON without sending it to an unknown third-party site.",
      "You need a fast validator that tells you where the syntax error is.",
      "You want the output to use 2 vs 4-space indent and keep keys in insertion order.",
    ],
    whenNotToUse: [
      "You need schema validation (JSON Schema / OpenAPI) — use a schema validator.",
      "You need a JSON diff — use a diff tool.",
      "You need JSON5 or JSONC (with comments) — this tool uses strict JSON.",
    ],
    example: {
      input: "{\"user\":\"ada\",\"roles\":[\"admin\",\"editor\"],\"active\":true}",
      output: "{\n  \"user\": \"ada\",\n  \"roles\": [\n    \"admin\",\n    \"editor\"\n  ],\n  \"active\": true\n}",
      note: "Formatted with 2-space indent. Minify collapses the same structure back to a single line.",
    },
    faq: [
      {
        q: "Does my JSON get sent anywhere?",
        a: "No. The tool uses the browser's built-in JSON.parse and JSON.stringify. You can paste production payloads and secrets safely — nothing leaves the tab.",
      },
      {
        q: "Why does the error say 'Unexpected token'?",
        a: "Usually a missing comma between fields, a trailing comma after the last field, a single-quoted string, or an unquoted key. The column number in the error points at the offending character.",
      },
    ],
  },
  "character-counter": {
    render: () => <CharacterCounter />,
    explainer: (
      <>
        <p>
          A free character counter that tracks what actually matters: total characters (with and
          without spaces), word count, and live progress bars against real platform limits — tweets
          (280), SMS (160), meta titles (60), meta descriptions (160), LinkedIn posts (3,000), and
          Instagram captions (2,200). Paste any text and the numbers update instantly. Everything
          runs in your browser, so your draft never leaves the page.
        </p>
        <p>
          Character limits are a surprisingly large part of the job for anyone writing for the
          web. Meta descriptions that run long get truncated in search results; tweets that sneak
          past 280 quietly lose the last word; SMS messages over 160 get split into two billable
          segments. The bars go amber at 90% and red when you cross — a visual cue that&rsquo;s
          faster than counting.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type your text into the box.",
      "Read the headline counts: characters, no spaces, words, lines.",
      "Scan the platform limit bars to see where you stand for your target platform.",
      "Trim the text if any bar turns amber or red, or use Copy when it's ready.",
    ],
      faq: [
      { q: "Does the counter include spaces?", a: "Both numbers are shown: total characters (with spaces) and character count without spaces. Social platforms usually count with spaces; SEO meta tag limits also count with spaces." },
      { q: "What's the character limit for a meta description?", a: "About 155–160 characters on desktop and 120 on mobile before Google truncates. Stay under 155 to be safe." },
      { q: "Does a tweet count URLs as 23 characters?", a: "Yes — X/Twitter shortens any URL to 23 characters via t.co regardless of the original length. Our counter doesn't auto-shorten; assume every URL will become 23 characters on post." },
      { q: "Is my text uploaded anywhere?", a: "No. The counter runs entirely in your browser using JavaScript. Nothing you paste leaves the tab." },
    ],
  },
  "countdown-timer": {
    render: () => <CountdownTimer />,
    explainer: (
      <>
        <p>
          A free online countdown timer that works for any duration from seconds to hours. Type
          minutes and seconds, tap a preset, or both — then Start. Pause and resume mid-round,
          reset any time, and hear a short beep when the timer hits zero. It runs entirely in
          your browser and keeps going even if the tab is in the background.
        </p>
        <p>
          Countdown timers are an underrated productivity tool. A visible deadline changes
          behavior — &ldquo;I&rsquo;ll draft this until the timer hits zero&rdquo; beats a
          to-do list for getting unstuck. Use it for focused work sprints, cooking, speeches,
          workouts, or any moment when you want a hard stop instead of letting a task expand to
          fill all available time.
        </p>
      </>
    ),
    howToUse: [
      "Enter minutes and seconds, or tap a preset (5m, 10m, 25m…).",
      "Click Start. The timer counts down in large digits.",
      "Use Pause/Resume if interrupted, or Reset to start over.",
      "A beep plays at zero — the tab can be backgrounded while it runs.",
    ],
      faq: [
      {
        "q": "Will the timer still alert me if the tab is in the background?",
        "a": "Yes, a browser notification fires at zero if you granted notification permission; otherwise an in-page beep plays when you return to the tab. Keep the tab open — pinning it in Chrome prevents accidental closes."
      },
      {
        "q": "How is this different from the Pomodoro timer?",
        "a": "This is a flexible countdown from any duration (30 seconds, 45 minutes, 2 hours). The Pomodoro timer enforces the 25/5 focus-break cycle. Use the countdown for cooking, workouts, or meeting hard-stops; use Pomodoro for deep-work sessions."
      },
      {
        "q": "Does pausing lose the remaining time?",
        "a": "No — pause freezes the remaining time, and resume picks up from exactly that point. You can pause and resume as many times as you want without drift."
      }
    ],
  },
  "password-generator": {
    render: () => <PasswordGenerator />,
    explainer: (
      <>
        <p>
          A free password generator that runs entirely in your browser — the password never
          leaves your device. Choose length (8–64), toggle character classes (lowercase,
          uppercase, digits, symbols), optionally exclude look-alike characters (I, l, 1, O, 0,
          o), and get a fresh strong password. A built-in strength meter estimates entropy based
          on the character pool and length.
        </p>
        <p>
          Longer is better: a 20-character password with mixed classes has more entropy than a
          complicated 10-character one. For anything you actually care about — email, banking,
          password manager master password — aim for 16+ characters with all classes enabled.
          Paired with a password manager, you only need to remember one strong password ever.
        </p>
      </>
    ),
    howToUse: [
      "Slide Length to your target (20 is a solid default).",
      "Toggle character classes — keep all four on unless a site blocks symbols.",
      "Click Regenerate until you get one you like.",
      "Click Copy and paste into your password manager or the signup form.",
    ],
    useCases: [
      "Creating a new account on any site that doesn't auto-generate for you.",
      "Rotating a password after a breach (check haveibeenpwned.com).",
      "Generating Wi-Fi, database, or API passwords.",
      "Seeding a password manager's vault with strong unique passwords.",
    ],
    whenToUse: [
      "You need a password and you don't want to use one you'll remember.",
      "You use a password manager and need the thing it stores.",
      "You're setting up infrastructure (DB, SSH key passphrase, etc.).",
    ],
    whenNotToUse: [
      "You need to memorize the password. Use a diceware passphrase (6+ words) instead — still strong, far easier to remember.",
      "You're generating a PIN. Strong passwords aren't the same as strong PINs; a PIN tool is more appropriate.",
    ],
    example: {
      input: "Length: 20\nClasses: a-z, A-Z, 0-9, symbols\nExclude look-alikes: on",
      output: "v#Kq7n$Mh3RyfXjwTb2P",
      note: "At length 20 with all four classes, entropy is ~131 bits — comfortably strong for anything short of a nation-state adversary.",
    },
    howItWorks: (
      <>
        <p>
          The generator reads cryptographically secure random bytes from your
          browser&rsquo;s <code>crypto.getRandomValues()</code> API and maps each
          byte to a character from the enabled pool. No <code>Math.random()</code> —
          that&rsquo;s predictable and not safe for passwords.
        </p>
        <p>
          Entropy (shown by the strength meter) is calculated as
          <code> log2(pool_size) × length</code>. Each added character class expands
          the pool; each added character multiplies total possibilities. Length
          wins over complexity — 20 lowercase letters beats a 10-character symbol
          soup.
        </p>
      </>
    ),
    faq: [
      {
        q: "Is the password actually random?",
        a: "Yes — it comes from Web Crypto's getRandomValues, the same CSPRNG used by browsers for TLS. Math.random is never used here.",
      },
      {
        q: "Does the site see or log the password?",
        a: "No. Generation happens in your tab. You can disconnect from the internet and it still works.",
      },
      {
        q: "How long should a password be?",
        a: "16 is fine for low-stakes sites, 20 for anything you'd hate to have breached, 24+ for a password-manager master password and financial / identity accounts.",
      },
    ],
  },
  "stopwatch": {
    render: () => <Stopwatch />,
    explainer: (
      <>
        <p>
          A free online stopwatch with millisecond precision, lap splits, and start/pause/reset
          controls. Everything runs in your browser — no sign-up, no ads, no syncing. The tab can
          sit in the background and the count keeps going accurately.
        </p>
        <p>
          Stopwatches are useful for workouts, interval training, cooking, speeches, and any
          &ldquo;I want to know how long this took&rdquo; situation. The lap button captures a
          split without stopping the clock — great for tracking each set in a workout or each
          segment of a multi-stage task.
        </p>
      </>
    ),
    howToUse: [
      "Click Start to begin timing.",
      "Tap Lap to capture a split without stopping the overall timer.",
      "Pause to hold, Resume to continue from the same point.",
      "Reset clears the clock and all laps when you&rsquo;re done.",
    ],
      faq: [
      {
        "q": "Can I record lap times?",
        "a": "Yes — click Lap to capture a split without stopping the overall timer. The lap list stays on screen until you Reset. Useful for timing sets at the gym, interview rounds, or cooking steps."
      },
      {
        "q": "Does the stopwatch keep running if I switch tabs?",
        "a": "Yes. Like most in-browser timers here, the stopwatch uses timestamps rather than interval ticks, so it's accurate across tab switches, locks, and sleep. The displayed numbers update when you return to the tab."
      },
      {
        "q": "What's the maximum time it can track?",
        "a": "Up to 24 hours with millisecond precision. Past that the display scrolls but the underlying count remains accurate — we just haven't made it look pretty for multi-day use."
      }
    ],
  },
  "case-converter": {
    render: () => <CaseConverter />,
    explainer: (
      <>
        <p>
          A fast free case converter for any text — paste your input and get instant UPPERCASE,
          lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case,
          CONSTANT_CASE, and iNVERTED output. Everything transforms in your browser, so your text
          never leaves the tab.
        </p>
        <p>
          Case conversion is one of those micro-tasks that eats real time when done manually.
          Variable names, headline formatting, CSV headers, URL slugs, SQL column names — each has
          its own convention. Paste once, click the case you need, copy, done.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the input box.",
      "Click any case button — output updates live.",
      "Copy the result with the Copy button next to each output.",
      "Clear the input when you're ready for the next text.",
    ],
    useCases: [
      "Normalizing variable names between JavaScript (camelCase), Python (snake_case), and SQL (snake_case).",
      "Reformatting a headline for title-case social posts or blog headings.",
      "Converting a phrase into a URL slug (kebab-case) quickly.",
      "Preparing CONSTANT_CASE names for environment variables.",
    ],
    whenToUse: [
      "Any one-off text case conversion without firing up a terminal.",
      "Cleaning up a pasted value from a spreadsheet or PDF.",
      "Comparing how the same phrase looks across naming conventions.",
    ],
    whenNotToUse: [
      "Bulk conversion of 1000+ items — script it in Python or Node instead.",
      "Language-specific title case that requires style guides (AP, Chicago) — this uses a generic heuristic.",
      "Text that contains code samples you don't want rewritten.",
    ],
    example: {
      input: "Hello World from Free Tool Arena",
      output: "camelCase: helloWorldFromFreeToolArena\nPascalCase: HelloWorldFromFreeToolArena\nsnake_case: hello_world_from_free_tool_arena\nkebab-case: hello-world-from-free-tool-arena\nCONSTANT_CASE: HELLO_WORLD_FROM_FREE_TOOL_ARENA",
    },
    faq: [
      {
        q: "Does Title Case follow AP or Chicago rules?",
        a: "Neither strictly. Title Case here capitalizes every word. For AP/Chicago rules (which skip short prepositions, conjunctions, etc.), you'd need a specialized tool or an editor add-on.",
      },
      {
        q: "Is my text uploaded anywhere?",
        a: "No. All conversion happens in your browser tab. Close the tab and the text is gone.",
      },
    ],
  },
  "slug-generator": {
    render: () => <SlugGenerator />,
    explainer: (
      <>
        <p>
          A free URL slug generator that turns any title into a clean, SEO-friendly slug. Removes
          accents and diacritics, strips common stop words if you want, and joins the rest with
          dashes or underscores. Runs entirely in the browser.
        </p>
        <p>
          Good slugs are short, keyword-focused, and readable. &ldquo;best-productivity-apps&rdquo;
          beats &ldquo;post-4217&rdquo; for both users and search engines. Pair with our{" "}
          <a href="/guides/seo-basics-for-beginners">SEO basics guide</a> to use slugs that
          actually help rankings.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type your title into the input box.",
      "Toggle stop-word removal if you want a shorter slug.",
      "Choose a dash or underscore separator.",
      "Copy the generated slug with one click.",
    ],
      faq: [
      {
        "q": "What makes a good URL slug?",
        "a": "Short, all lowercase, hyphen-separated, ASCII-only, and ideally 3–6 words. Keep the main keyword toward the start. Avoid stop words (\"a\", \"the\", \"of\") unless removing them makes the slug confusing."
      },
      {
        "q": "Should I use dashes or underscores?",
        "a": "Dashes. Google treats dashes as word separators and underscores as joiners, so \"my-free-tool\" ranks for [free tool] while \"my_free_tool\" is indexed as the single word \"my_free_tool\". Almost always use dashes."
      },
      {
        "q": "What happens if two pages get the same slug?",
        "a": "Most CMSes append \"-2\" to the duplicate automatically, which usually ranks worse than a deliberate variant. Rename the second one to something more specific instead of relying on the automatic suffix."
      }
    ],
  },
  "lorem-ipsum-generator": {
    render: () => <LoremIpsumGenerator />,
    explainer: (
      <>
        <p>
          A clean lorem ipsum generator for designers, developers, and writers who need filler
          copy. Pick paragraphs, sentences, or words; optionally start with the classic
          &ldquo;Lorem ipsum dolor sit amet&rdquo; lead. Everything renders instantly in your
          browser.
        </p>
        <p>
          Lorem ipsum has been used since the 1500s as placeholder text because it looks like
          normal prose without being readable enough to distract. Use it in mockups, templates,
          and content prototypes — just remember to replace it before shipping.
        </p>
      </>
    ),
    howToUse: [
      "Pick paragraphs, sentences, or words as the unit.",
      "Set the count you need.",
      "Toggle the classic lorem ipsum lead on or off.",
      "Click Copy to grab the generated filler text.",
    ],
      faq: [
      {
        "q": "Why use Lorem Ipsum instead of real text?",
        "a": "Designers and front-end engineers use filler text to check layout without readers being distracted by content. Real copy makes people read instead of looking at spacing, alignment, and hierarchy — Lorem Ipsum keeps attention on the visual structure."
      },
      {
        "q": "Is it actual Latin?",
        "a": "Loosely — it's scrambled, truncated Cicero from De Finibus Bonorum et Malorum. The text doesn't make grammatical sense, which is the point: it reads like language without being language."
      },
      {
        "q": "Can I generate shorter filler for small UI elements?",
        "a": "Yes — switch the unit to \"words\" and set a count of 3–10 for card titles, or 20–40 for preview paragraphs. Shorter filler often looks more realistic for modern layouts."
      }
    ],
  },
  "unit-converter": {
    render: () => <UnitConverter />,
    explainer: (
      <>
        <p>
          A free unit converter for length, weight, volume, and area — the everyday conversions
          that come up constantly. Meters to feet, pounds to kilograms, gallons to liters, acres
          to hectares. Runs in your browser with live updates as you type.
        </p>
        <p>
          Conversions are a staple of cross-country recipes, travel planning, international
          shipping, and DIY projects. This tool covers the main categories you&rsquo;ll hit
          99% of the time; specialized conversions (cooking temperatures, fuel economy) are
          handled by our{" "}
          <a href="/tools/temperature-converter">temperature converter</a> and category-specific
          tools.
        </p>
      </>
    ),
    howToUse: [
      "Pick a category: length, weight, volume, or area.",
      "Enter a value in the From field.",
      "Pick the From and To units.",
      "Read the converted value — updates live as you type.",
    ],
      faq: [
      { q: "Which units does the converter support?", a: "Length, weight, temperature, volume, speed, area, time, data size, fuel economy, and energy — the most common everyday units plus several engineering/scientific ones." },
      { q: "Does it handle compound units like km/h?", a: "Yes — the Speed tab converts km/h, mph, knots, m/s, and ft/s directly between each other." },
      { q: "How accurate are the conversion factors?", a: "Converter uses SI-base conversion factors to 10 significant digits. For legal, scientific, or engineering work, always verify against the authoritative source for your domain." },
      { q: "Can I bookmark a specific conversion?", a: "Yes — the URL updates as you change inputs, so you can bookmark or share a link that pre-fills a specific value and unit pair." },
    ],
  },
  "temperature-converter": {
    render: () => <TemperatureConverter />,
    explainer: (
      <>
        <p>
          A simple Celsius, Fahrenheit, and Kelvin converter for cooking, science, and travel.
          Type in any field and the other two update live. Formulas are shown below so you know
          exactly how the conversion is happening.
        </p>
        <p>
          Temperature conversion catches most people at the wrong moment — in the kitchen with a
          recipe in the &ldquo;wrong&rdquo; units, or checking foreign weather before a trip. 0°C
          = 32°F (freezing), 100°C = 212°F (boiling), 20°C = 68°F (comfortable room temperature).
        </p>
      </>
    ),
    howToUse: [
      "Type a value in any of the three boxes — Celsius, Fahrenheit, or Kelvin.",
      "The other two update live.",
      "Scan the formula below if you want to do the math by hand.",
      "Clear the field when you're ready for a new value.",
    ],
    useCases: [
      "Following a recipe written in the 'other' unit.",
      "Checking a foreign weather forecast before travel.",
      "Converting lab or science class readings between units.",
      "Making sure an oven setting matches what a recipe calls for.",
    ],
    whenToUse: [
      "Quick single conversions in the kitchen, lab, or travel context.",
      "Double-checking a mental conversion before acting on it.",
    ],
    whenNotToUse: [
      "Converting a whole recipe — convert each temperature and amount individually with the right tool.",
      "Wind chill, heat index, or humidity-adjusted temperature (those have their own formulas).",
    ],
    example: {
      input: "Celsius: 180°C",
      output: "Fahrenheit: 356°F\nKelvin: 453.15 K",
      note: "180°C is a common oven setting for baking — roughly 'moderate' heat.",
    },
    howItWorks: (
      <>
        <p>
          Three straightforward formulas: <code>°F = °C × 9/5 + 32</code>, <code>°C = (°F − 32) × 5/9</code>,
          and <code>K = °C + 273.15</code>. Kelvin is the SI unit (absolute zero is 0 K = −273.15°C); Celsius and
          Fahrenheit are both relative scales whose zero-points were chosen historically, not physically.
        </p>
      </>
    ),
    faq: [
      {
        q: "Why is 0°C not 0°F?",
        a: "They use different zero-points. 0°C is water freezing; 0°F was originally a freezing mixture of brine (salt water), which is colder than plain water. The two scales also have different-sized degrees, which is why the conversion involves multiplication, not just addition.",
      },
    ],
  },
  "bmi-calculator": {
    render: (params) => (
      <BmiCalculator
        initialWeight={num(params, "weight")}
        initialHeight={num(params, "height")}
      />
    ),
    explainer: (
      <>
        <p>
          A free BMI (body mass index) calculator that takes metric or imperial inputs and returns
          your BMI plus the WHO classification: underweight, normal, overweight, or obese. Runs
          in your browser with no tracking.
        </p>
        <p>
          BMI is a rough screening tool, not a diagnosis. It doesn&rsquo;t account for muscle
          mass, frame size, or body composition — a lean athlete can register as
          &ldquo;overweight&rdquo; on BMI while being in peak health. Use it as one data point
          among several, not as the defining measure of fitness.
        </p>
      </>
    ),
    howToUse: [
      "Pick metric (cm / kg) or imperial (ft, in / lb).",
      "Enter your height and weight.",
      "Read your BMI and the WHO category it falls in.",
      "Treat it as a screening number, not a verdict.",
    ],
    useCases: [
      "Quick check against a doctor's BMI number.",
      "Tracking a rough trend over months while losing or gaining weight.",
      "Filling a field on a form that asks for BMI.",
    ],
    whenToUse: [
      "You want the number WHO uses, for screening purposes only.",
      "You're tracking your own trend over time.",
    ],
    whenNotToUse: [
      "You're muscular or athletic — BMI will classify you as overweight when you're lean. Use body-fat percent or waist-to-height ratio instead.",
      "You're under 18 — use a pediatric BMI percentile calculator, not an adult one.",
      "You're pregnant — BMI doesn't apply.",
    ],
    example: {
      input: "Height: 175 cm\nWeight: 72 kg",
      output: "BMI: 23.5\nCategory: Normal (WHO 18.5–24.9)",
      note: "WHO categories: under 18.5 underweight; 18.5–24.9 normal; 25–29.9 overweight; 30+ obese.",
    },
    faq: [
      {
        q: "Is BMI a good health measure?",
        a: "It's a rough screening tool. It correlates with metabolic risk at the population level but can mislabel individuals. Waist-to-height ratio and body-fat percent are better individual measures.",
      },
      {
        q: "Does BMI differ by ethnicity?",
        a: "Yes. Risk thresholds are lower for people of South Asian ancestry (some guidelines use 23 as 'overweight' and 27.5 as 'obese'). Talk to a doctor for targets specific to you.",
      },
    ],
  },
  "calorie-calculator": {
    render: () => <CalorieCalculator />,
    explainer: (
      <>
        <p>
          A free daily calorie calculator using the Mifflin-St Jeor equation, the most accurate
          BMR formula for the general population. Enter age, sex, height, weight, and activity
          level; get an estimated maintenance calorie number. Runs entirely in your browser.
        </p>
        <p>
          The number it returns is an estimate — individual metabolism varies by 10–15%. Use it
          as a starting point: track actual intake for two weeks, adjust up or down based on how
          your weight responds. Pair with our{" "}
          <a href="/guides/how-to-meal-prep">meal prep guide</a> to actually hit the target
          without thinking about it every meal.
        </p>
      </>
    ),
    howToUse: [
      "Enter age, sex, height, and weight.",
      "Pick an activity level honestly — most people overestimate.",
      "Read your estimated maintenance calories.",
      "Treat it as a starting point; refine it with 2 weeks of real-world tracking.",
    ],
  },
  "water-intake-calculator": {
    render: () => <WaterIntakeCalculator />,
    explainer: (
      <>
        <p>
          A free daily water intake calculator that sizes your target based on weight and
          exercise — roughly 35ml per kg of body weight plus 355ml per 30 minutes of activity.
          Runs in your browser, no sign-up.
        </p>
        <p>
          The &ldquo;8 cups&rdquo; rule is a starting guideline, not a prescription. Your real
          target depends on body mass, climate, activity level, and diet (water-rich foods
          reduce the plain-water requirement). Pair with our{" "}
          <a href="/guides/how-to-drink-more-water">hydration guide</a> for practical tactics to
          actually hit your number.
        </p>
      </>
    ),
    howToUse: [
      "Enter your weight (metric or imperial).",
      "Add minutes of daily exercise.",
      "Read your daily water target in liters and ounces.",
      "Pair with a marked water bottle or bottle count to hit it.",
    ],
      faq: [
      { q: "Do I really need 8 cups a day?", a: "The '8 cups' guideline is widely cited but not strongly evidence-based. The calculator uses bodyweight-based targets (~30–35 ml per kg) plus adjustments for activity and climate, which better reflects actual need." },
      { q: "Does coffee count?", a: "Yes, despite persistent myths — moderate caffeine consumption doesn't cause net dehydration. Coffee, tea, sparkling water, and even food water all count toward total fluid intake." },
      { q: "Can I drink too much water?", a: "Yes — hyponatremia (low blood sodium from over-drinking) is rare but serious. The risk is mostly in endurance athletes and a handful of medical conditions. Follow thirst; don't force water beyond comfort." },
      { q: "Does climate change the number?", a: "Yes — hot or humid conditions can raise needs by 20-40%, and altitude adds another 5-15%. The calculator includes adjustments for both." },
    ],
  },
  "coin-flip": {
    render: () => <CoinFlip />,
    explainer: (
      <>
        <p>
          A free virtual coin flip with an animated toss, heads/tails tally, and percentage bar.
          Useful when you need a fair binary decision and don&rsquo;t have a physical coin handy —
          or when you want to track outcomes over multiple flips.
        </p>
        <p>
          Coin flips are surprisingly useful beyond games. When two options feel equal, flipping
          a coin and noticing your reaction to the result often reveals which one you actually
          wanted. If you&rsquo;re disappointed by the flip, go with the other option.
        </p>
      </>
    ),
    howToUse: [
      "Tap Flip to toss the coin.",
      "Watch the animated result — heads or tails.",
      "See the running tally and percentage below.",
      "Reset any time to start a new series.",
    ],
  },
  "dice-roller": {
    render: () => <DiceRoller />,
    explainer: (
      <>
        <p>
          A free online dice roller supporting d4, d6, d8, d10, d12, d20, and d100. Uses
          cryptographically-secure randomness (window.crypto), which matters for tabletop games
          where fairness is the point. Runs in your browser.
        </p>
        <p>
          Dice rollers are essential for tabletop RPGs (D&amp;D, Pathfinder), board games with
          lost dice, remote gaming, and quick random decisions. The crypto-backed randomness
          makes this closer to a &ldquo;real&rdquo; roll than most JavaScript random-number
          generators.
        </p>
      </>
    ),
    howToUse: [
      "Pick a die type (d4, d6, d20, etc).",
      "Set how many dice to roll at once.",
      "Click Roll — see the individual results and total.",
      "Keep rolling; each roll uses fresh cryptographic randomness.",
    ],
  },
  "age-calculator": {
    render: (params) => {
      const dob = typeof params?.dob === "string" ? params.dob : undefined;
      return <AgeCalculator initialDob={dob} />;
    },
    explainer: (
      <>
        <p>
          A free age calculator that returns your exact age in years, months, and days — plus
          total months, weeks, days, and hours lived, and days until your next birthday. Enter
          your birthdate and a target date; everything computes live in the browser.
        </p>
        <p>
          Age calculators are useful for forms that need exact age-at-date, planning milestones
          (retirement, eligibility), or just curiosity. The total-days-lived number is a
          surprisingly motivating number to know — it&rsquo;s finite, it&rsquo;s counting, and
          it puts daily habits in perspective.
        </p>
      </>
    ),
    howToUse: [
      "Enter your birthdate.",
      "Optionally set a target date (defaults to today).",
      "Read your age in years/months/days, plus total units lived.",
      "Check the countdown to your next birthday.",
    ],
      faq: [
      {
        "q": "Does it account for leap years?",
        "a": "Yes. The calculator uses the actual calendar — Feb 29 exists in leap years and gets counted correctly. Someone born on a leap day technically has a birthday every four years, but the calculator always returns a birthday on Feb 28 or Mar 1 in non-leap years."
      },
      {
        "q": "Can I calculate age as of a past date?",
        "a": "Yes — set the target date to any past date. Useful for life-insurance policies that rate you as of a contract date, or historical research (how old was someone when an event happened)."
      },
      {
        "q": "Is this accurate to the day?",
        "a": "Yes, with caveat: time zones are ignored. If you were born at 11pm in UTC+1 and the calculation runs in UTC-8, the day count may be off by one. For pet age or routine use this is irrelevant."
      }
    ],
  },
  "loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A free loan calculator that computes your monthly payment, total paid over the life of
          the loan, and total interest cost. Enter principal, APR, and term (years); everything
          updates live. Uses the standard amortization formula — same as any bank calculator.
        </p>
        <p>
          Before signing any loan agreement, know the full cost. A $20,000 loan at 7% for 5 years
          costs $3,761 in interest; the same loan stretched to 7 years costs $5,371. Longer terms
          = lower monthly payment and more total interest. Our{" "}
          <a href="/guides/how-to-pay-off-debt-fast">debt payoff guide</a> explains strategies to
          minimize this.
        </p>
      </>
    ),
    howToUse: [
      "Enter the loan principal (amount borrowed).",
      "Enter the annual interest rate (APR).",
      "Enter the loan term in years.",
      "Read your monthly payment, total cost, and total interest.",
    ],
    useCases: [
      "Comparing two loan offers from different lenders.",
      "Sanity-checking a car dealership's advertised monthly payment.",
      "Deciding between a 5-year and 7-year loan term.",
      "Estimating interest savings from paying extra each month.",
    ],
    whenToUse: [
      "Any fixed-rate installment loan: auto, personal, student, small business.",
      "Before signing — compare total interest across terms.",
      "When a lender quotes you a payment but not the total cost.",
    ],
    whenNotToUse: [
      "Mortgages with taxes and insurance — use the mortgage calculator (it includes PITI).",
      "Variable-rate loans or credit card debt — use the debt payoff calculator.",
      "Interest-only or balloon-payment loans (different amortization).",
    ],
    example: {
      input: "Principal: $20,000\nRate: 7% APR\nTerm: 5 years",
      output: "Monthly payment: $396.02\nTotal paid: $23,761.44\nTotal interest: $3,761.44",
      note: "Stretching the same loan to 7 years drops the payment to $302/mo but increases total interest to $5,371.",
    },
    howItWorks: (
      <>
        <p>
          Standard amortization formula: <code>M = P × [r(1+r)^n] / [(1+r)^n - 1]</code> where{" "}
          <code>P</code> is principal, <code>r</code> is the monthly rate (APR ÷ 12), and{" "}
          <code>n</code> is the number of monthly payments (years × 12). Every payment covers all
          interest accrued that month plus a bit of principal; early in the loan most of your
          payment is interest, later most is principal.
        </p>
      </>
    ),
    faq: [
      {
        q: "Does this include fees or origination charges?",
        a: "No. It calculates only principal, interest, and term. Lender fees, origination charges, and prepayment penalties vary by loan and should be added separately.",
      },
      {
        q: "Is APR the same as interest rate?",
        a: "Close but not identical. APR includes certain fees; the raw interest rate does not. For accurate comparison, use the APR from each lender's disclosure.",
      },
    ],
  },
  "mortgage-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price")}
        initialDown={num(params, "down")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A free mortgage calculator with PITI: Principal, Interest, Taxes, and Insurance — the
          four components of an actual monthly mortgage payment. Most calculators only show
          principal+interest and leave you surprised at closing. This one includes the rest.
        </p>
        <p>
          Your real monthly mortgage bill is 25-40% higher than the P&amp;I number. Property taxes
          vary by locality (1-2.5% of home value per year). Homeowners insurance is another $1,200-
          $2,500 per year. Always budget against PITI, not advertised principal+interest.
        </p>
      </>
    ),
    howToUse: [
      "Enter home price and down payment percent.",
      "Enter mortgage rate and term (usually 30 years).",
      "Estimate property tax rate and annual insurance.",
      "Read your full PITI monthly payment.",
    ],
    useCases: [
      "Estimating the real monthly cost of a home before making an offer.",
      "Comparing 15-year vs 30-year mortgage terms.",
      "Checking whether a specific home fits the 28% rule (PITI ≤ 28% of gross income).",
      "Understanding how a rate change of 0.5% impacts monthly budget.",
    ],
    whenToUse: [
      "House-hunting — sanity-check the affordability of listings.",
      "Refinancing — compare current PITI against a new rate.",
      "Deciding between putting 10%, 15%, or 20% down.",
    ],
    whenNotToUse: [
      "Adjustable-rate mortgages (ARMs) — this assumes a fixed rate for the full term.",
      "Loans with PMI modeled separately — this calculator folds insurance into a single line.",
      "HOA fees, utilities, or maintenance reserves — those sit on top of PITI.",
    ],
    example: {
      input: "Home price: $400,000\nDown payment: 20%\nRate: 6.5%\nTerm: 30 years\nProperty tax: 1.2%\nInsurance: $1,500/yr",
      output: "P&I: $2,022/mo\nTaxes: $400/mo\nInsurance: $125/mo\nTotal PITI: $2,547/mo",
      note: "The advertised P&I number is 21% lower than the real monthly cost — always budget against PITI.",
    },
    howItWorks: (
      <>
        <p>
          Principal and interest use the standard amortization formula{" "}
          <code>M = P × [r(1+r)^n] / [(1+r)^n - 1]</code>. Taxes are calculated as{" "}
          <code>(home price × tax rate) / 12</code>. Insurance is{" "}
          <code>(annual premium) / 12</code>. The four components sum to PITI — the number you
          actually pay each month.
        </p>
      </>
    ),
    faq: [
      {
        q: "Why is my real mortgage quote higher than this?",
        a: "Likely PMI (private mortgage insurance, required if you put down less than 20%), HOA fees, or an escrow cushion. Add those separately.",
      },
      {
        q: "Should I choose 15 or 30 years?",
        a: "15-year saves enormous interest but roughly doubles the monthly payment. 30-year is safer for cash flow and lets you invest the difference. Run both and compare.",
      },
    ],
  },
  "compound-interest-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal")}
        initialContribution={num(params, "monthly")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A compound interest calculator that shows what a starting balance plus regular monthly
          contributions becomes over time at a given return rate. The number at 30 years is often
          shocking — this is the magic of compounding.
        </p>
        <p>
          $200/month at 7% for 30 years = $245,000. At 40 years = $525,000. Time is the dominant
          variable, not amount. Starting early beats contributing more. Pair with our{" "}
          <a href="/guides/how-to-start-investing-with-100-dollars">investing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter starting balance and monthly contribution.",
      "Set expected annual return (7% is a common long-term stock market assumption).",
      "Set number of years to invest.",
      "See the ending balance and total contributed vs. interest earned.",
    ],
    useCases: [
      "Projecting a retirement account balance at age 65.",
      "Showing a teenager what $100/month becomes over 40 years.",
      "Comparing the impact of starting 5 years earlier vs saving 50% more.",
      "Modeling a 529 college savings account growth.",
    ],
    whenToUse: [
      "Long-horizon planning (10+ years) where compounding dominates.",
      "Comparing consistent-contribution strategies over time.",
      "Illustrating the cost of waiting to invest.",
    ],
    whenNotToUse: [
      "Short-term savings under 5 years — use the savings goal calculator.",
      "Debt payoff — the math runs the opposite direction (use the debt payoff calculator).",
      "Tax-advantaged accounts where contribution limits and tax treatment matter (use a proper retirement planner).",
    ],
    example: {
      input: "Starting balance: $5,000\nMonthly contribution: $500\nAnnual return: 7%\nYears: 30",
      output: "Ending balance: $650,000\nTotal contributed: $185,000\nInterest earned: $465,000",
      note: "Interest earned exceeds contributions by 2.5×. This is why time matters more than amount.",
    },
    howItWorks: (
      <>
        <p>
          Uses the future-value formula for a series with compound interest:{" "}
          <code>FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r]</code> where <code>P</code> is starting
          balance, <code>PMT</code> is periodic contribution, <code>r</code> is periodic rate, and{" "}
          <code>n</code> is number of periods. We compound monthly to match how most retirement
          accounts work.
        </p>
      </>
    ),
    faq: [
      {
        q: "What annual return should I use?",
        a: "7% is a common real (inflation-adjusted) long-term stock market estimate. 10% is the nominal historical average. Use 5-6% for a conservative bond-heavy portfolio.",
      },
      {
        q: "Does this account for inflation?",
        a: "No. The output is in future dollars. If you assumed a 7% real return (already inflation-adjusted), then the number approximates today's purchasing power. If you used 10%, divide by roughly 2-3× over 30 years for a rough real-dollar estimate.",
      },
    ],
  },
  // =========================================================================
  // LOAN VARIANTS (8) — shared LoanCalculator engine with variant-specific
  // defaults, copy, and FAQ. Targets long-tail commercial keywords.
  // =========================================================================
  "car-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 35000}
        initialRate={num(params, "rate") ?? 7.5}
        initialYears={num(params, "years") ?? 5}
      />
    ),
    explainer: (
      <>
        <p>
          A free car loan calculator tuned to the inputs actually printed on a dealer&rsquo;s
          financing sheet: vehicle price, APR, and term in years. It returns the monthly payment
          and — more importantly — the total interest you&rsquo;ll pay before you own the car.
          Knowing that number up front is the single best thing you can do to negotiate well.
        </p>
        <p>
          A $35,000 car loan at 7.5% for 5 years costs $702/month and $7,100 in interest. Stretch
          that same loan to 7 years and the monthly drops to $538 — but total interest jumps to
          $10,200. Longer term, lower payment, more total cost. Run both before you sign. Pair with
          our <a href="/guides/how-to-make-a-monthly-budget">budget guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the vehicle price (after any down payment and trade-in).",
      "Enter the APR from your lender or pre-approval.",
      "Enter the term in years — 5 is typical, 6-7 is common but costly.",
      "Read monthly payment and total interest; compare across terms.",
    ],
    useCases: [
      "Comparing the dealer&rsquo;s financing offer vs a credit union pre-approval.",
      "Deciding between a 60-month and 72-month loan.",
      "Budgeting a realistic monthly car payment before shopping.",
    ],
    whenToUse: [
      "Any fixed-rate auto loan — new car, used car, refinance quote.",
      "Before walking into a dealership, so you have a number in your head.",
    ],
    whenNotToUse: [
      "Leases — those use money factor and residual value, not APR.",
      "Variable-rate or promotional APR loans where the rate changes mid-term.",
    ],
    example: {
      input: "Price: $35,000\nAPR: 7.5%\nTerm: 5 years",
      output: "Monthly: $701.89\nTotal paid: $42,113\nTotal interest: $7,113",
      note: "A 7-year term drops the monthly to $538 but raises total interest to $10,185 — $3,072 more.",
    },
    faq: [
      {
        q: "Should I finance through the dealer or a credit union?",
        a: "Credit unions almost always win on APR. Get pre-approved before you walk in; use the dealer&rsquo;s offer only if they actually beat it.",
      },
      {
        q: "Is 7.5% a good auto loan rate?",
        a: "Depends on credit tier and year. Excellent credit typically gets rates a few points below average; subprime borrowers pay considerably more. Check current national averages before assuming your rate is good.",
      },
    ],
  },
  "auto-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 28000}
        initialRate={num(params, "rate") ?? 7.25}
        initialYears={num(params, "years") ?? 6}
      />
    ),
    explainer: (
      <>
        <p>
          An auto loan calculator that takes three inputs — amount financed, APR, and term — and
          returns the full cost of the loan, not just the monthly payment. Most dealer conversations
          happen in monthly-payment terms, which is exactly why long terms get pushed: a
          &ldquo;lower&rdquo; monthly is often a higher total cost.
        </p>
        <p>
          Run multiple scenarios side by side. Change only the term, or only the APR, to see where
          the real money is. Most people overpay by thousands because they only asked about the
          monthly payment.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount you&rsquo;re actually financing (price − down payment − trade-in).",
      "Enter the APR, not the &ldquo;money factor.&rdquo;",
      "Set the term; longer = lower monthly, more total interest.",
      "Scan both the monthly and the total interest line.",
    ],
    useCases: [
      "Shopping pre-approved APRs from 2-3 lenders.",
      "Weighing whether to put more down (less principal = less interest).",
      "Deciding if a higher sticker price with 0% APR beats a lower price at standard APR.",
    ],
    whenToUse: [
      "Any auto purchase where you&rsquo;ll finance any part of the price.",
      "Comparing refinance offers on an existing auto loan.",
    ],
    whenNotToUse: [
      "Leases — different math.",
      "Promotional 0% APR deals — no interest, but those loans often require taking a higher price; compare the all-in cost.",
    ],
    example: {
      input: "Amount financed: $28,000\nAPR: 7.25%\nTerm: 6 years",
      output: "Monthly: $479.69\nTotal paid: $34,538\nTotal interest: $6,538",
      note: "Dropping APR by 2 points (to 5.25%) saves $1,867 over the life of the loan.",
    },
    faq: [
      {
        q: "What&rsquo;s the difference between APR and interest rate?",
        a: "APR includes certain lender fees; the raw interest rate doesn&rsquo;t. Compare offers using APR for an apples-to-apples number.",
      },
      {
        q: "How much down payment should I put?",
        a: "At minimum, enough to avoid being underwater when you drive off. New cars depreciate 10-20% immediately; 20% down protects you.",
      },
    ],
  },
  "personal-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 10000}
        initialRate={num(params, "rate") ?? 11.5}
        initialYears={num(params, "years") ?? 3}
      />
    ),
    explainer: (
      <>
        <p>
          A personal loan calculator for unsecured consumer loans — the kind you&rsquo;d take out
          to consolidate credit card debt, cover a medical bill, or finance a one-time big expense.
          APRs are higher than secured loans (car, mortgage) but lower than credit cards, which is
          exactly why consolidation is a common use.
        </p>
        <p>
          Before you borrow, run the numbers on both the new personal loan and whatever you&rsquo;re
          paying on now. If your credit card APR is 22% and a personal loan is 11.5%, consolidating
          can cut your interest cost in half — provided you don&rsquo;t rack the card back up. Pair
          with our <a href="/guides/how-to-pay-off-debt-fast">debt payoff guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the loan amount you plan to borrow.",
      "Enter the APR from your pre-approval offer.",
      "Enter the term — 2, 3, 5, or 7 years are standard.",
      "Read monthly payment and total interest.",
    ],
    useCases: [
      "Consolidating high-APR credit card debt.",
      "Covering a medical or emergency expense when no cheaper option exists.",
      "Financing a home improvement without a HELOC.",
    ],
    whenToUse: [
      "Unsecured fixed-rate consumer loans.",
      "Comparing offers from LendingClub, SoFi, Upstart, etc.",
    ],
    whenNotToUse: [
      "Payday loans and title loans — different (predatory) product.",
      "Variable-rate lines of credit.",
    ],
    example: {
      input: "Amount: $10,000\nAPR: 11.5%\nTerm: 3 years",
      output: "Monthly: $329.73\nTotal paid: $11,870\nTotal interest: $1,870",
      note: "Same $10,000 at 22% APR (credit card territory) costs $3,878 in interest over 3 years — more than double.",
    },
    faq: [
      {
        q: "Are personal loans better than credit card debt?",
        a: "Usually yes, if you qualify for a lower APR. Fixed term means you&rsquo;ll actually pay it off; revolving credit cards can roll forever.",
      },
      {
        q: "What&rsquo;s a typical personal loan APR?",
        a: "Ranges from about 7% for excellent credit to 36% cap in many states. 10-15% is typical for good credit.",
      },
    ],
  },
  "student-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 30000}
        initialRate={num(params, "rate") ?? 6.5}
        initialYears={num(params, "years") ?? 10}
      />
    ),
    explainer: (
      <>
        <p>
          A student loan calculator that estimates monthly payments on a standard 10-year
          amortized repayment plan. Federal Stafford and Grad PLUS loans use this structure by
          default; refinanced private loans do too. The numbers here assume a fixed APR, which is
          the norm for federal loans.
        </p>
        <p>
          A $30,000 balance at 6.5% for 10 years costs $340/month and $10,897 in interest —
          roughly a third of the principal. Income-driven repayment plans can lower that monthly
          but extend the timeline and change the math considerably. Federal loans also have
          different rules than private; check with your servicer before committing.
        </p>
      </>
    ),
    howToUse: [
      "Enter your total loan balance (sum of all loans, or model one at a time).",
      "Enter the APR — check your Master Promissory Note or servicer dashboard.",
      "10 years is standard; use 15 or 20 for extended/income-driven plans.",
      "Read monthly payment; total interest is the real cost number.",
    ],
    useCases: [
      "Estimating post-graduation payment on a current balance.",
      "Comparing standard repayment vs an extended plan.",
      "Deciding whether to refinance to a lower private APR (only if you don&rsquo;t need federal protections).",
    ],
    whenToUse: [
      "Federal or private student loans with a fixed APR and standard amortization.",
      "Refinance scenarios.",
    ],
    whenNotToUse: [
      "Income-driven repayment with forgiveness — the math is different; use the federal Loan Simulator.",
      "Public Service Loan Forgiveness tracks — also different math.",
    ],
    example: {
      input: "Balance: $30,000\nAPR: 6.5%\nTerm: 10 years",
      output: "Monthly: $340.82\nTotal paid: $40,897\nTotal interest: $10,897",
      note: "Stretching to 20 years lowers monthly to $223 but raises total interest to $23,711 — more than doubles it.",
    },
    faq: [
      {
        q: "Should I refinance my federal loans?",
        a: "Only if you don&rsquo;t need federal protections (income-driven repayment, deferment, PSLF). Refinancing to private loses those permanently.",
      },
      {
        q: "Are student loan interest payments tax-deductible?",
        a: "Up to $2,500 of student loan interest per year is deductible from taxable income, subject to income limits. Check current IRS rules for your filing year.",
      },
    ],
  },
  "boat-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 40000}
        initialRate={num(params, "rate") ?? 8.5}
        initialYears={num(params, "years") ?? 10}
      />
    ),
    explainer: (
      <>
        <p>
          A free boat loan calculator built around the realities of marine financing: longer terms
          (10-20 years is common), higher APRs than auto loans, and a much steeper depreciation
          curve. Enter loan amount, APR, and term — get monthly payment and total interest before
          you sign anything at the marina.
        </p>
        <p>
          Boats depreciate faster than most people expect. A loan that outlives the boat&rsquo;s
          useful life is a real risk, which is why shorter terms are friendlier even though the
          monthly is higher. Budget for dockage, fuel, insurance, and winter storage before you
          commit to the payment.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount financed after any down payment.",
      "Enter the APR from your marine lender or bank.",
      "Enter the term in years — 10, 15, or 20.",
      "Read monthly payment and total interest; factor in ownership costs separately.",
    ],
    useCases: [
      "Budgeting a realistic monthly payment before a boat purchase.",
      "Comparing marine-lender APRs with a home equity loan option.",
      "Deciding between new vs used financing terms.",
    ],
    whenToUse: [
      "Fixed-rate secured boat loans.",
      "Refinance scenarios on existing marine financing.",
    ],
    whenNotToUse: [
      "Dealer-financed promotional terms with variable rates.",
      "Chartered/commercial vessels (different tax and financing rules).",
    ],
    example: {
      input: "Amount: $40,000\nAPR: 8.5%\nTerm: 10 years",
      output: "Monthly: $495.95\nTotal paid: $59,514\nTotal interest: $19,514",
      note: "Nearly half the loan cost is interest at this term; a 7-year loan saves about $6,300.",
    },
    faq: [
      {
        q: "Can I deduct boat loan interest?",
        a: "If the boat qualifies as a second home (has sleeping, cooking, and toilet facilities), loan interest may be deductible under current US tax rules. Check with a tax professional.",
      },
      {
        q: "Why are boat loan APRs higher than auto loan APRs?",
        a: "Boats depreciate faster and are harder to repossess and resell. Lenders price that risk into the rate.",
      },
    ],
  },
  "rv-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 50000}
        initialRate={num(params, "rate") ?? 7.9}
        initialYears={num(params, "years") ?? 15}
      />
    ),
    explainer: (
      <>
        <p>
          A free RV loan calculator for Class A, Class B, Class C, travel trailers, and fifth
          wheels. RV financing often stretches 15-20 years because the dollar amounts are high,
          which dramatically changes the total-interest picture. Enter amount, APR, and term to
          see exactly what you&rsquo;ll pay over the life of the loan.
        </p>
        <p>
          A $50,000 RV loan at 7.9% for 15 years is $475/month but costs $35,500 in interest —
          nearly 71% of the sticker price added to the total. Shorter terms are much cheaper
          overall. Always include campground fees, insurance, maintenance, and fuel in your full
          ownership budget.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount you&rsquo;re financing.",
      "Enter the APR from your RV lender or bank.",
      "Enter the term in years; 10-20 is typical.",
      "Read monthly payment and total interest.",
    ],
    useCases: [
      "Budgeting for a full-time or part-time RV lifestyle.",
      "Comparing lender offers on a new or used RV.",
      "Deciding between a longer term vs a larger down payment.",
    ],
    whenToUse: [
      "Fixed-rate RV loans from banks, credit unions, or RV-specialty lenders.",
      "Used-RV refinance scenarios.",
    ],
    whenNotToUse: [
      "Dealer-promotional variable-rate offers.",
      "Commercial RV use (different tax and loan rules).",
    ],
    example: {
      input: "Amount: $50,000\nAPR: 7.9%\nTerm: 15 years",
      output: "Monthly: $475.39\nTotal paid: $85,570\nTotal interest: $35,570",
      note: "Dropping to 10 years lifts monthly to $604 but saves $14,246 in total interest.",
    },
    faq: [
      {
        q: "Can an RV qualify as a second home for tax purposes?",
        a: "If the RV has sleeping, cooking, and toilet facilities, it can qualify as a second home and mortgage-interest deductions may apply. Check current IRS rules.",
      },
      {
        q: "Should I finance a used RV?",
        a: "Used RVs depreciate less than new, which is why many buyers go used. Expect slightly higher APRs and shorter allowed terms on older models.",
      },
    ],
  },
  "motorcycle-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 12000}
        initialRate={num(params, "rate") ?? 8.0}
        initialYears={num(params, "years") ?? 5}
      />
    ),
    explainer: (
      <>
        <p>
          A free motorcycle loan calculator covering standard street bikes, sport bikes, cruisers,
          and touring models. Motorcycle APRs are typically 1-3 points higher than auto loan APRs
          because bikes are riskier collateral, and terms tend to max out at 60-72 months rather
          than auto&rsquo;s 84.
        </p>
        <p>
          Enter amount, APR, and term; the calculator shows monthly payment, total paid, and
          total interest. Insurance and gear are separate costs and add up quickly for new riders —
          budget for them before you commit to the bike payment.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount financed after your down payment.",
      "Enter the APR from your lender or dealer offer.",
      "Enter the term — 3, 4, or 5 years is typical.",
      "Read monthly and total interest.",
    ],
    useCases: [
      "Comparing a credit union motorcycle loan vs dealer financing.",
      "Modeling different down-payment amounts.",
      "Deciding between new and used financing terms.",
    ],
    whenToUse: [
      "Fixed-rate motorcycle loans.",
      "Refinance scenarios.",
    ],
    whenNotToUse: [
      "Promotional 0% APR offers (valid but require their own math).",
      "Personal loans used for a bike (use the personal loan calculator).",
    ],
    example: {
      input: "Amount: $12,000\nAPR: 8.0%\nTerm: 5 years",
      output: "Monthly: $243.32\nTotal paid: $14,599\nTotal interest: $2,599",
      note: "Dropping the term to 3 years raises the monthly to $376 but cuts total interest to $1,539.",
    },
    faq: [
      {
        q: "Why are motorcycle loan rates higher than auto rates?",
        a: "Bikes are riskier collateral — they&rsquo;re easier to total, harder to repossess intact, and have higher theft rates. Lenders price that into the rate.",
      },
      {
        q: "Should I finance my gear?",
        a: "Most lenders won&rsquo;t. Gear is considered a consumable; finance it on a card with a real payoff plan, or (better) save up first.",
      },
    ],
  },
  "simple-loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount") ?? 10000}
        initialRate={num(params, "rate") ?? 6}
        initialYears={num(params, "years") ?? 3}
      />
    ),
    explainer: (
      <>
        <p>
          A simple loan calculator with three inputs and three outputs. Enter the amount borrowed,
          the APR, and the term in years. See the monthly payment, the total amount paid, and the
          total interest. No ads in the middle of the tool, no jargon, no tricks.
        </p>
        <p>
          Useful for any fixed-rate installment loan where you just want a fast answer — loaning
          money between family, estimating a personal loan, or doing a quick sanity check on a
          lender&rsquo;s quote.
        </p>
      </>
    ),
    howToUse: [
      "Enter the loan amount.",
      "Enter the APR.",
      "Enter the term in years.",
      "Read monthly, total paid, and total interest.",
    ],
    useCases: [
      "Fast back-of-the-envelope loan math.",
      "Family loan agreements where you need a payment schedule.",
      "Double-checking a lender&rsquo;s quoted monthly payment.",
    ],
    whenToUse: [
      "Any fixed-rate installment loan.",
      "Teaching someone how loan math works.",
    ],
    whenNotToUse: [
      "Loans with fees or points (add them to principal first).",
      "Variable-rate or balloon-payment loans.",
    ],
    example: {
      input: "Amount: $10,000\nAPR: 6%\nTerm: 3 years",
      output: "Monthly: $304.22\nTotal paid: $10,952\nTotal interest: $952",
      note: "A 6% personal loan is roughly 3× cheaper than a 22% credit card over the same period.",
    },
    faq: [
      {
        q: "Does this calculator account for origination fees?",
        a: "No. Add any origination fee to the principal before calculating. For example, a $10,000 loan with a 3% origination fee becomes $10,300.",
      },
    ],
  },
  // =========================================================================
  // MORTGAGE VARIANTS (6) — shared MortgageCalculator engine.
  // =========================================================================
  "30-year-mortgage-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 400000}
        initialDown={num(params, "down") ?? 20}
        initialRate={num(params, "rate") ?? 6.75}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A 30-year mortgage calculator with PITI: principal, interest, taxes, and insurance. The
          30-year fixed is the most popular mortgage in the US for one reason — the monthly
          payment is about 40% lower than a 15-year on the same loan amount. That lower monthly is
          the tradeoff for paying much more total interest over the life of the loan.
        </p>
        <p>
          A $320,000 loan (80% of a $400,000 home) at 6.75% for 30 years is roughly $2,076/month
          in P&amp;I alone — $346,000 of interest over three decades. Taxes and insurance push the
          real monthly 20-30% higher. Know the PITI before you offer on a house.
        </p>
      </>
    ),
    howToUse: [
      "Enter the home price and down payment percent.",
      "Enter the rate; 30-year fixed rates change with the market.",
      "Estimate property tax rate (1-2.5% of home value is typical in the US).",
      "Enter annual insurance; $1,200-$2,500 is typical.",
      "Read the full PITI monthly payment.",
    ],
    useCases: [
      "Comparing homes at different price points.",
      "Checking the affordability of a 30-year loan against the 28% income rule.",
      "Comparing a new 30-year vs refinancing into a 15-year.",
    ],
    whenToUse: [
      "30-year fixed-rate conventional loans.",
      "Refinance scenarios into a 30-year term.",
    ],
    whenNotToUse: [
      "Adjustable-rate mortgages.",
      "Interest-only or balloon products.",
    ],
    example: {
      input: "Home price: $400,000\nDown payment: 20%\nRate: 6.75%\nTerm: 30 years",
      output: "P&I: $2,076/mo\nTaxes: $400/mo (1.2%)\nInsurance: $100/mo\nTotal PITI: $2,576/mo",
      note: "Over 30 years you&rsquo;ll pay about $747k total for a $320k loan. The 15-year version on the same loan pays about $510k total but at $2,830/mo.",
    },
    faq: [
      {
        q: "Is a 30-year mortgage better than a 15-year?",
        a: "Better for cash flow; worse for total cost. The 30-year gives you margin to invest the difference or weather a downturn. The 15-year locks in lower total interest.",
      },
      {
        q: "Why is my real mortgage quote higher than this?",
        a: "Likely HOA, PMI (if less than 20% down), and an escrow cushion. Add those to the PITI number this calculator shows.",
      },
    ],
  },
  "15-year-mortgage-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 400000}
        initialDown={num(params, "down") ?? 20}
        initialRate={num(params, "rate") ?? 6.0}
        initialYears={num(params, "years") ?? 15}
      />
    ),
    explainer: (
      <>
        <p>
          A 15-year mortgage calculator with full PITI. Shorter term, lower rate (usually
          0.5-0.75% below the 30-year), much higher monthly payment, but dramatically less total
          interest. This is the pragmatic choice if you can stretch into the higher payment
          comfortably.
        </p>
        <p>
          On the same $320,000 loan, 15 years at 6.0% costs about $2,700/month but only $166,000
          in total interest — less than half of the 30-year path. You own the home outright 15
          years sooner. The tradeoff is a ~35% higher monthly payment, which has to fit in your
          budget without stress.
        </p>
      </>
    ),
    howToUse: [
      "Enter the home price and down payment.",
      "Enter the rate — check for a specific 15-year quote, not a 30-year.",
      "Add property tax rate and annual insurance.",
      "Read the full PITI monthly and compare to the 30-year option.",
    ],
    useCases: [
      "Comparing the two common fixed terms side by side.",
      "Deciding if you can absorb the higher 15-year payment.",
      "Refinancing from a 30-year into a 15-year to save interest.",
    ],
    whenToUse: [
      "When monthly cash flow comfortably supports the higher payment.",
      "When you want to be mortgage-free faster (approaching retirement, etc.).",
    ],
    whenNotToUse: [
      "If the higher payment would crowd out retirement savings or emergency fund.",
      "If you need maximum flexibility in tight-budget months.",
    ],
    example: {
      input: "Home price: $400,000\nDown: 20%\nRate: 6.0%\nTerm: 15 years",
      output: "P&I: $2,700/mo\nTaxes: $400/mo\nInsurance: $100/mo\nTotal PITI: $3,200/mo",
      note: "Saves roughly $180,000 in total interest vs a 30-year on the same loan.",
    },
    faq: [
      {
        q: "Why are 15-year rates lower?",
        a: "Shorter duration = less risk for the lender. They pass some of that savings to the borrower.",
      },
      {
        q: "Should I pick a 30-year and pay extra, or a 15-year?",
        a: "The 15-year forces the discipline and guarantees the savings. The 30-year gives flexibility at a higher total cost. Both are valid; match the choice to your risk tolerance.",
      },
    ],
  },
  "fha-loan-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 300000}
        initialDown={num(params, "down") ?? 3.5}
        initialRate={num(params, "rate") ?? 7.0}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          An FHA loan calculator. FHA loans let qualified buyers put as little as 3.5% down, which
          is the single biggest reason they&rsquo;re used by first-time homebuyers. The catch is
          mortgage insurance premium (MIP) — an upfront fee plus an annual premium that stays on
          the loan for the long term in most cases.
        </p>
        <p>
          The calculator estimates your PITI payment. Remember to add MIP to your total monthly
          cost — it&rsquo;s typically 0.55-0.85% of the loan amount per year. At a $290,000 loan
          balance, that&rsquo;s $133-$205/month on top of the PITI this calculator shows.
        </p>
      </>
    ),
    howToUse: [
      "Enter the home price.",
      "Enter 3.5% as the minimum FHA down payment.",
      "Enter the current FHA rate (often slightly below conventional).",
      "Include property taxes and insurance.",
      "Add monthly MIP separately based on your loan balance.",
    ],
    useCases: [
      "First-time homebuyer planning.",
      "Comparing FHA vs conventional 3% down programs.",
      "Assessing the all-in cost including MIP.",
    ],
    whenToUse: [
      "Buyers with limited down payment savings.",
      "Buyers with lower credit scores (FHA is more lenient).",
    ],
    whenNotToUse: [
      "Buyers with 20%+ down — conventional usually beats FHA on total cost.",
      "Investment or second-home purchases (FHA is owner-occupied only).",
    ],
    example: {
      input: "Home price: $300,000\nDown: 3.5% ($10,500)\nRate: 7.0%\nTerm: 30 years",
      output: "P&I: $1,927/mo\nTaxes: $300/mo\nInsurance: $75/mo\nPITI subtotal: $2,302/mo\n+ Estimated MIP: ~$180/mo\nAll-in: ~$2,482/mo",
      note: "MIP adds roughly $2,160/year to the cost. Refinancing to conventional once you hit 20% equity can drop it.",
    },
    faq: [
      {
        q: "Does FHA MIP ever drop off?",
        a: "For most FHA loans originated after 2013 with less than 10% down, MIP lasts the life of the loan. Refinancing to a conventional loan is the usual exit.",
      },
      {
        q: "What credit score do I need for FHA?",
        a: "580+ qualifies for 3.5% down. Below that, a larger down payment is typically required. Lenders can overlay stricter requirements.",
      },
    ],
  },
  "va-loan-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 350000}
        initialDown={num(params, "down") ?? 0}
        initialRate={num(params, "rate") ?? 6.5}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A VA loan calculator for eligible veterans, active-duty service members, and surviving
          spouses. VA loans allow zero down payment, no private mortgage insurance (PMI), and
          competitive interest rates. There is a one-time VA funding fee (typically 1.25-3.3% of
          the loan) unless exempted for disability.
        </p>
        <p>
          No PMI is the big math advantage. On a $350,000 home with zero down, a conventional loan
          would require PMI until 20% equity is built up — often $200-$300/month. VA loans skip
          that entirely, which is why the effective monthly payment can be much lower than an
          equivalent conventional path.
        </p>
      </>
    ),
    howToUse: [
      "Enter the home price.",
      "Set down payment to 0 unless you want to reduce your funding fee.",
      "Enter the VA rate (often slightly below conventional).",
      "Include property tax and insurance.",
      "Factor the funding fee into closing costs, not monthly.",
    ],
    useCases: [
      "Eligible veterans comparing VA vs conventional options.",
      "Active-duty service members planning a purchase with minimal cash.",
      "Surviving spouses of eligible veterans.",
    ],
    whenToUse: [
      "When eligible and intending to use the home as a primary residence.",
      "Refinancing from a conventional loan into a VA loan.",
    ],
    whenNotToUse: [
      "Investment properties (VA loans are primary-residence only).",
      "Non-eligible buyers — conventional or FHA instead.",
    ],
    example: {
      input: "Home price: $350,000\nDown: $0\nRate: 6.5%\nTerm: 30 years",
      output: "P&I: $2,213/mo\nTaxes: $350/mo\nInsurance: $100/mo\nTotal PITI: $2,663/mo",
      note: "Zero down + no PMI saves roughly $200-$300/month vs an equivalent conventional 0-3% down loan.",
    },
    faq: [
      {
        q: "How do I prove VA eligibility?",
        a: "Request a Certificate of Eligibility (COE) from the VA. Most lenders can submit the request on your behalf.",
      },
      {
        q: "Is there a loan limit for VA loans?",
        a: "Veterans with full entitlement have no VA loan limit, though lenders may cap at their own comfort. Partial-entitlement buyers have limits based on county.",
      },
    ],
  },
  "refinance-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 400000}
        initialDown={num(params, "down") ?? 25}
        initialRate={num(params, "rate") ?? 5.75}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A refinance calculator that lets you model a new mortgage alongside your current one.
          Use the inputs as the new-loan numbers: the refi&rsquo;s principal, the new rate, and
          the new term. Compare the new monthly and total interest to what you&rsquo;re paying
          today, then subtract closing costs to find your true break-even point.
        </p>
        <p>
          Rule of thumb: if the rate drop is 0.75% or more and you plan to stay in the home long
          enough to recoup closing costs (usually 3-5 years), a refi typically pays off. Below
          that threshold, or with a short expected stay, it often doesn&rsquo;t.
        </p>
      </>
    ),
    howToUse: [
      "Enter the loan balance you&rsquo;d refi (usually &lt; original principal).",
      "Enter the new rate you&rsquo;re being quoted.",
      "Pick a new term (keeping 30 years resets the clock; a 15 or 20 shortens it).",
      "Compare the new PITI and total interest to your current loan.",
      "Subtract closing costs to find break-even.",
    ],
    useCases: [
      "Deciding whether to refinance into a lower rate.",
      "Switching from a 30-year to a 15-year while keeping roughly the same monthly.",
      "Cash-out refinance math (principal goes up; interest goes up too).",
    ],
    whenToUse: [
      "Rate has dropped 0.75%+ since original loan.",
      "Switching loan type (ARM to fixed, FHA to conventional to drop MIP).",
      "Removing a co-borrower via a refi.",
    ],
    whenNotToUse: [
      "If you plan to move within 1-2 years — closing costs likely eat the savings.",
      "If cash-out is for consumer spending rather than a real investment.",
    ],
    example: {
      input: "New principal: $300,000\nNew rate: 5.75%\nNew term: 30 years",
      output: "New P&I: $1,751/mo\nNew total interest (30 yrs): $330,309\nBreak-even (assuming $6,000 closing): ~36 months vs current 6.75% loan",
      note: "A 1% rate drop on $300,000 saves about $170/month — roughly $60k over 30 years.",
    },
    faq: [
      {
        q: "What are typical refinance closing costs?",
        a: "2-5% of the loan amount. On a $300,000 refi, expect $6,000-$15,000 in costs unless you pick a no-closing-cost refi (which typically has a higher rate).",
      },
      {
        q: "Should I do a no-closing-cost refi?",
        a: "Only if you&rsquo;re not staying long enough to amortize the costs. The higher rate usually makes it more expensive over time.",
      },
    ],
  },
  "mortgage-affordability-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price") ?? 350000}
        initialDown={num(params, "down") ?? 10}
        initialRate={num(params, "rate") ?? 6.75}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A mortgage affordability calculator that shows full PITI on various home prices. Lenders
          use the 28/36 rule: PITI should be no more than 28% of your gross monthly income, and
          total debt payments (PITI + car + student loans + minimum credit card payments) should
          stay under 36%.
        </p>
        <p>
          Run prices up and down until the PITI lands at or below 28% of your gross monthly. Then
          pressure-test it: could you still hit all your other financial goals (emergency fund,
          retirement, kids) at that payment? If the answer is &ldquo;only if nothing goes wrong,&rdquo;
          go lower.
        </p>
      </>
    ),
    howToUse: [
      "Start with a candidate home price.",
      "Enter your realistic down payment.",
      "Enter today&rsquo;s mortgage rate.",
      "Add property tax rate and insurance estimate.",
      "Check PITI against 28% of your gross monthly income.",
    ],
    useCases: [
      "Figuring out a realistic home-price range before shopping.",
      "Running the 28/36 check on a lender&rsquo;s pre-approval amount (often higher than you should actually spend).",
      "Comparing what different down-payment amounts enable.",
    ],
    whenToUse: [
      "Early in the home-buying process.",
      "When a pre-approval comes back higher than you expected — check whether you can actually afford it.",
    ],
    whenNotToUse: [
      "As the only decision input — budget priorities (retirement, kids, travel, job risk) matter too.",
    ],
    example: {
      input: "Gross monthly income: $9,000 (example)\n28% of that: $2,520\nIf your target PITI ≤ $2,520/mo: about a $310,000 home with 10% down at 6.75%.",
      output: "Home price: $310,000\nDown: $31,000\nP&I: $1,810/mo\nTaxes: $310/mo\nInsurance: $80/mo\nTotal PITI: $2,200/mo",
      note: "Pre-approvals often stretch higher than the 28% rule; just because a lender will lend it doesn&rsquo;t mean you should borrow it.",
    },
    faq: [
      {
        q: "What&rsquo;s the 28/36 rule?",
        a: "PITI ≤ 28% of gross monthly income; total debt payments ≤ 36%. Lenders often go beyond these in pre-approvals; they&rsquo;re still a useful personal guardrail.",
      },
      {
        q: "Should I use gross or net income?",
        a: "Lenders use gross. For personal budgeting, net is more realistic. We recommend running both.",
      },
    ],
  },
  // =========================================================================
  // SAVINGS / RETIREMENT VARIANTS (5) — reuse CompoundInterestCalculator
  // where appropriate, SavingsGoalCalculator where target-date logic fits.
  // =========================================================================
  "401k-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal") ?? 10000}
        initialContribution={num(params, "monthly") ?? 800}
        initialRate={num(params, "rate") ?? 7}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A 401(k) calculator that projects your balance at retirement based on current balance,
          monthly contributions (including employer match), assumed annual return, and years until
          retirement. The underlying math is compound interest with periodic contributions.
        </p>
        <p>
          $800/month ($9,600/year, well under the 2026 limit) at 7% for 30 years = $1.18M. The
          employer match is the highest-return contribution you&rsquo;ll ever make — don&rsquo;t
          leave it on the table. If your employer matches 50% up to 6% of salary, always contribute
          at least 6% even if you can&rsquo;t max out.
        </p>
      </>
    ),
    howToUse: [
      "Enter your current 401(k) balance.",
      "Add your monthly contribution plus employer match.",
      "Use 7% as a reasonable long-term return assumption.",
      "Set years to retirement.",
      "See the projected balance.",
    ],
    useCases: [
      "Projecting your retirement balance.",
      "Seeing the impact of increasing contributions by 1% of salary.",
      "Modeling a catch-up contribution strategy close to retirement.",
    ],
    whenToUse: [
      "Annual retirement planning review.",
      "Deciding whether to increase your contribution percentage.",
      "Comparing the long-term effect of different employer match levels.",
    ],
    whenNotToUse: [
      "Calculating Roth conversions or RMD strategy — different math.",
      "Tracking asset allocation or rebalancing (use a brokerage tool).",
    ],
    example: {
      input: "Current balance: $10,000\nMonthly contribution (you + match): $800\nAnnual return: 7%\nYears: 30",
      output: "Projected balance: $1,188,000\nTotal contributed: $298,000\nGrowth: $890,000",
      note: "Growth triples contributions at 30 years — this is the compounding argument in a single number.",
    },
    faq: [
      {
        q: "What percentage should I contribute?",
        a: "At least enough to capture the full employer match (often 5-6% of salary). Targeting 15% of gross income including match is a common long-term goal.",
      },
      {
        q: "What happens if I change jobs?",
        a: "You can roll the 401(k) into your new employer&rsquo;s plan or into an IRA. Rolling into an IRA usually gives more investment options.",
      },
    ],
  },
  "roth-ira-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal") ?? 5000}
        initialContribution={num(params, "monthly") ?? 500}
        initialRate={num(params, "rate") ?? 7}
        initialYears={num(params, "years") ?? 30}
      />
    ),
    explainer: (
      <>
        <p>
          A Roth IRA calculator. Roth IRA contributions are made with after-tax money, meaning
          qualified withdrawals in retirement are tax-free — including all the growth. For many
          people, especially those with decades until retirement, this is the single best
          retirement account available.
        </p>
        <p>
          At $500/month (well under the 2026 contribution limit) with 30 years of 7% returns, the
          balance reaches about $620,000. Every dollar of that is withdrawable tax-free in
          retirement — no RMDs, no surprise tax bills. Pair with a 401(k) if your employer offers a
          match.
        </p>
      </>
    ),
    howToUse: [
      "Enter your current Roth balance.",
      "Enter your monthly contribution (up to the annual limit / 12).",
      "Use 7% as a reasonable long-term return assumption.",
      "Set years until retirement.",
      "Read the projected tax-free balance.",
    ],
    useCases: [
      "Planning tax-free retirement income.",
      "Modeling the value of maxing out Roth contributions each year.",
      "Comparing Roth IRA vs 401(k) prioritization.",
    ],
    whenToUse: [
      "Annual retirement planning.",
      "Income below the Roth IRA contribution limit.",
      "Expecting to be in the same or higher tax bracket in retirement.",
    ],
    whenNotToUse: [
      "If your income exceeds direct Roth limits — consider a backdoor Roth (different mechanics).",
      "Traditional IRA or 401(k) analysis (those involve tax deductions now, taxable withdrawals later).",
    ],
    example: {
      input: "Current balance: $5,000\nMonthly contribution: $500\nAnnual return: 7%\nYears: 30",
      output: "Projected balance: $620,000\nTotal contributed: $185,000\nGrowth: $435,000\nAll withdrawable tax-free in retirement",
      note: "Same contributions in a taxable brokerage would owe capital gains and dividend tax annually and at withdrawal.",
    },
    faq: [
      {
        q: "What&rsquo;s the Roth IRA contribution limit?",
        a: "The IRS adjusts the limit annually. For current year limits and income phase-outs, check IRS Publication 590-A before contributing.",
      },
      {
        q: "Can I withdraw Roth IRA contributions before retirement?",
        a: "Contributions (not growth) can be withdrawn tax- and penalty-free at any time. Growth withdrawn before age 59½ and 5 years from first contribution is usually taxable and may owe a 10% penalty.",
      },
    ],
  },
  "retirement-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal") ?? 50000}
        initialContribution={num(params, "monthly") ?? 1500}
        initialRate={num(params, "rate") ?? 7}
        initialYears={num(params, "years") ?? 25}
      />
    ),
    explainer: (
      <>
        <p>
          A general retirement calculator. Enter your current invested balance (across all
          retirement accounts), your total monthly contributions, an assumed return rate, and the
          number of years until you retire. The output is a single number: your projected nest
          egg at retirement.
        </p>
        <p>
          A common rule of thumb is the 4% rule — you can safely withdraw 4% of your balance per
          year in retirement. $1.5M supports about $60k/year of pre-tax spending. Run multiple
          scenarios: what if you contribute 15% more? What if you work 3 more years? The levers
          are surprisingly large.
        </p>
      </>
    ),
    howToUse: [
      "Add up all retirement account balances and enter the total.",
      "Add all monthly contributions (your 401(k) + match + any IRA).",
      "Use 7% as a conservative long-term return assumption.",
      "Enter years to retirement.",
      "Apply the 4% rule to estimate annual retirement income.",
    ],
    useCases: [
      "Annual big-picture retirement check.",
      "Testing the effect of a major contribution change.",
      "Deciding whether you can retire in X years.",
    ],
    whenToUse: [
      "Once a year as a sanity check.",
      "At any major life or income change.",
    ],
    whenNotToUse: [
      "For Social Security or pension planning — those use different math.",
      "For Monte Carlo simulation (variability matters in real retirements).",
    ],
    example: {
      input: "Current total: $50,000\nMonthly contributions: $1,500\nAnnual return: 7%\nYears: 25",
      output: "Projected balance: $1,490,000\n4% rule income: $59,600/year pre-tax",
      note: "Every extra year of work at these contributions adds roughly $140,000 to the final balance.",
    },
    faq: [
      {
        q: "Is the 4% rule still valid?",
        a: "It&rsquo;s a heuristic, not a law. Most modern research suggests 3.5-4% for 30-year retirements. A portfolio-and-spending check with a fee-only advisor is wise as retirement approaches.",
      },
      {
        q: "How much do I actually need to retire?",
        a: "About 25× your annual expenses is a common target (the 4% rule in reverse). For $50k/year spending, aim for $1.25M. For $100k/year, $2.5M.",
      },
    ],
  },
  "college-savings-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal") ?? 2000}
        initialContribution={num(params, "monthly") ?? 300}
        initialRate={num(params, "rate") ?? 6}
        initialYears={num(params, "years") ?? 18}
      />
    ),
    explainer: (
      <>
        <p>
          A college savings calculator for 529 plans and general investment accounts. Enter current
          balance, monthly contribution, and years until your child enrolls. 529 plans grow
          tax-free when used for qualified education expenses; general brokerage accounts grow
          with taxable gains but offer more flexibility.
        </p>
        <p>
          $300/month for 18 years at 6% = $117,000. That roughly covers a four-year public
          in-state undergraduate education if costs grow with inflation — though costs have
          historically outrun general inflation. Starting as early as possible makes the biggest
          difference.
        </p>
      </>
    ),
    howToUse: [
      "Enter the current 529 or college-savings balance.",
      "Enter the monthly contribution.",
      "Use 6% as a moderately conservative return (younger kids can use 7%).",
      "Enter years until enrollment.",
      "Compare the result to current projected college costs.",
    ],
    useCases: [
      "New parents planning a 529 strategy.",
      "Grandparent contributions to existing 529s.",
      "Comparing aggressive vs conservative saving paths.",
    ],
    whenToUse: [
      "Any time before college enrollment.",
      "Annually as part of household financial review.",
    ],
    whenNotToUse: [
      "To project financial aid — separate calculation.",
      "For private-K-12 savings (529 usage here has different rules and limits).",
    ],
    example: {
      input: "Current: $2,000\nMonthly: $300\nReturn: 6%\nYears: 18",
      output: "Projected balance: $122,000\nTotal contributed: $66,800\nGrowth: $55,200",
      note: "Raising monthly to $500 grows the final balance to roughly $198,000 — $76,000 more for $200/month extra.",
    },
    faq: [
      {
        q: "What if my child doesn&rsquo;t go to college?",
        a: "529 plans can be transferred to other family members or used for trade schools, apprenticeships, and (up to limits) student loan repayment. Non-qualified withdrawals face taxes and a 10% penalty on growth.",
      },
      {
        q: "529 plan or brokerage?",
        a: "529 for tax-free growth if the money is likely to be used for education. Brokerage if you want flexibility, even at the cost of paying taxes on gains.",
      },
    ],
  },
  "emergency-fund-calculator": {
    render: () => <SavingsGoalCalculator />,
    explainer: (
      <>
        <p>
          An emergency fund calculator. The first question: how big should your emergency fund
          actually be? Standard guidance says 3-6 months of essential expenses (rent/mortgage,
          utilities, groceries, insurance, minimum debt payments). Self-employed or single-income
          households lean toward 6-12 months. Dual-income households with stable jobs can lean
          toward 3 months.
        </p>
        <p>
          The second question: how fast can you get there? Enter your target amount, how much
          you&rsquo;ve already saved, and your monthly savings rate. The calculator shows the
          timeline plus the interest you&rsquo;ll earn at current high-yield savings rates. Pair
          with our <a href="/guides/how-to-build-an-emergency-fund">emergency fund guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Calculate your essential monthly expenses.",
      "Multiply by 3, 6, or 12 to get your target.",
      "Enter that target as the goal amount.",
      "Enter current savings balance and HYSA APY.",
      "Read the monthly deposit needed to reach the goal by your date.",
    ],
    useCases: [
      "Building a first emergency fund from zero.",
      "Sizing a fund around a specific risk (job loss, medical, house repair).",
      "Comparing a 3-month vs 6-month target timeline.",
    ],
    whenToUse: [
      "When starting an emergency fund.",
      "When rebuilding after an emergency depleted savings.",
      "When switching to self-employment or a less stable income.",
    ],
    whenNotToUse: [
      "For long-term savings — money beyond the emergency fund should be invested, not kept in cash.",
    ],
    example: {
      input: "Essential monthly expenses: $4,000\nTarget: 6 months = $24,000\nStarting balance: $3,000\nHYSA APY: 4%\nTimeline: 24 months",
      output: "Required monthly deposit: ~$820\nTotal saved in 24 months: ~$24,800 (including interest)",
      note: "The HYSA interest covers about half a month of deposits over 24 months — not huge, but better than 0%.",
    },
    faq: [
      {
        q: "Where should I keep my emergency fund?",
        a: "In a high-yield savings account (HYSA) at an FDIC-insured bank. Instant access, meaningful interest (typically 4% in 2026), zero risk.",
      },
      {
        q: "Should I invest my emergency fund?",
        a: "No. The point is it&rsquo;s available when something goes wrong — exactly when investments are most likely to be down.",
      },
    ],
  },
  "savings-goal-calculator": {
    render: () => <SavingsGoalCalculator />,
    explainer: (
      <>
        <p>
          A free savings goal calculator that works the other direction: tell it what you want and
          when, and it tells you what monthly deposit gets you there. Accounts for your starting
          balance and your high-yield savings APY.
        </p>
        <p>
          Useful for short-term goals: a down payment, a wedding, an emergency fund, a trip. For
          money you&rsquo;ll need in under 5 years, a high-yield savings account beats investing —
          you want low volatility, not maximum return. See our{" "}
          <a href="/guides/how-to-build-an-emergency-fund">emergency fund guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your goal amount and timeline in months.",
      "Enter your starting balance (can be 0).",
      "Enter your HYSA APY (4% is typical in 2026).",
      "Read the required monthly deposit to reach the goal.",
    ],
      faq: [
      {
        "q": "Where should I park my savings while building to a goal?",
        "a": "A high-yield savings account (HYSA) from an online bank currently pays around 4 percent APY. That's $200/year per $5,000 saved — meaningful and fully liquid. Avoid locking short-term savings in CDs or the market."
      },
      {
        "q": "Should I include employer 401(k) match in my savings rate?",
        "a": "For this calculator, keep 401(k) separate — those funds aren't accessible for emergencies or short-term goals. Track them as retirement progress instead."
      },
      {
        "q": "What if I can't afford the required monthly deposit?",
        "a": "Push the target date out by three months, or reduce the goal by 10 percent, and rerun. Small adjustments compound — six extra months of savings on a five-year goal only cost a rounding error in lifestyle."
      }
    ],
  },
  "debt-payoff-calculator": {
    render: () => <DebtPayoffCalculator />,
    explainer: (
      <>
        <p>
          A free debt payoff calculator. Enter your balance, APR, and monthly payment — it
          returns how long until the debt is gone and how much you&rsquo;ll pay in total
          interest. Warns you if your monthly payment is too low to cover the interest (the trap
          that keeps people in debt forever).
        </p>
        <p>
          Credit card debt at 22% APR is financial bleeding. A $5,000 balance at $100/month takes
          forever and costs thousands. Increase the monthly payment and watch both time and
          interest drop fast. Pair with our{" "}
          <a href="/guides/how-to-pay-off-debt-fast">debt payoff guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the current debt balance.",
      "Enter the APR (check your statement — often 18-25% on cards).",
      "Enter the monthly payment you can commit to.",
      "Read months to payoff, total paid, and total interest.",
    ],
    useCases: [
      "Deciding between minimum payment vs an aggressive payoff plan.",
      "Seeing how an extra $100/month shortens a credit card balance.",
      "Confirming your monthly payment actually reduces principal.",
      "Sanity check before consolidating multiple balances.",
    ],
    whenToUse: [
      "Any single fixed-APR balance — credit cards, store cards, personal loans.",
      "Comparing avalanche vs snowball strategies on one debt at a time.",
      "Checking whether your payment is above the 'interest floor'.",
    ],
    whenNotToUse: [
      "Multiple debts with different APRs — model each separately or use a debt snowball spreadsheet.",
      "Promotional-rate balances (0% APR intro) — run the calculation against the post-promo rate.",
      "Taxes, tuition, or government-backed debt with income-driven repayment (different rules).",
    ],
    example: {
      input: "Balance: $5,000\nAPR: 22%\nMonthly payment: $150",
      output: "Months to payoff: 49 months (≈4 yrs)\nTotal paid: $7,290\nTotal interest: $2,290",
      note: "Bumping the payment to $250/month cuts payoff to 24 months and total interest to $1,026 — saving $1,264.",
    },
    faq: [
      {
        q: "What if my payment is lower than the monthly interest?",
        a: "The balance grows. The calculator will flag this case. Any payment below the interest floor means you'll never pay off the debt on that schedule — increase it or the balance compounds forever.",
      },
      {
        q: "Avalanche or snowball — which is better?",
        a: "Mathematically, avalanche (highest APR first) saves the most interest. Psychologically, snowball (smallest balance first) produces faster visible wins. For most people, snowball wins because consistency beats optimization.",
      },
    ],
  },
  "to-do-list": {
    render: () => <ToDoList />,
    explainer: (
      <>
        <p>
          A free simple to-do list that runs in your browser. Add tasks, check them off, remove
          them, or clear all completed at once. No account, no app to install, no sync. The list
          lives in your tab for the session.
        </p>
        <p>
          A good to-do list is simple. Complicated task managers often become the task. Write it
          down, do it, check it off. Our <a href="/guides/how-to-prioritize-tasks">task
          prioritization guide</a> covers the habit side.
        </p>
      </>
    ),
    howToUse: [
      "Type a task and press Enter, or click Add.",
      "Check the box to mark a task done.",
      "Click remove to delete a task entirely.",
      "Clear completed to tidy the list when you're done.",
    ],
  },
  "paycheck-calculator": {
    render: (params) => (
      <PaycheckCalculator
        initialGross={num(params, "gross")}
        initialRate={num(params, "rate")}
      />
    ),
    explainer: (
      <>
        <p>
          A free paycheck calculator that estimates your take-home pay after federal tax, state
          tax, Social Security, and Medicare. Enter gross salary and pay frequency; get the
          breakdown in seconds. All math runs in your browser.
        </p>
        <p>
          The numbers are estimates — actual paychecks depend on local tax, pre-tax deductions
          (401k, health insurance), and state-specific rules. Use this as a starting point, then
          compare against your real pay stub. Pair with our{" "}
          <a href="/guides/how-to-make-a-monthly-budget">budgeting guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your gross salary.",
      "Pick your pay frequency (weekly, biweekly, monthly).",
      "Set an approximate state tax rate (varies by state).",
      "Read your estimated net pay per paycheck and per year.",
    ],
    useCases: [
      "Estimating take-home pay for a new job offer.",
      "Comparing the net of two offers in different states.",
      "Setting a realistic monthly budget based on actual income.",
      "Understanding how a raise translates to real spendable dollars.",
    ],
    whenToUse: [
      "Evaluating a salaried W-2 offer.",
      "Ballparking net pay before pre-tax deductions.",
      "Cross-checking payroll math against your first pay stub.",
    ],
    whenNotToUse: [
      "Self-employment or 1099 income (different tax treatment — estimated quarterlies, self-employment tax).",
      "Pre-tax benefits math (401k, HSA, health insurance) that requires plan-specific details.",
      "Non-US payroll — this uses US federal brackets, FICA, and Medicare only.",
    ],
    example: {
      input: "Gross salary: $85,000\nFrequency: biweekly\nState tax: 5%",
      output: "Per paycheck: ≈$2,380\nAnnual net: ≈$61,900\nTotal deductions: ≈$23,100",
      note: "Real take-home will be lower once 401k, health insurance, and HSA contributions come out.",
    },
    faq: [
      {
        q: "Why doesn't this match my pay stub exactly?",
        a: "Pre-tax deductions (401k, health insurance, HSA), post-tax deductions (Roth 401k, garnishments), and local/city taxes aren't modeled. The output is a ballpark before those are applied.",
      },
      {
        q: "Is this accurate for 2026?",
        a: "Federal brackets and FICA rates are reviewed annually. If you're filing for a tax year with different brackets, treat the numbers as approximate.",
      },
    ],
  },
  "roi-calculator": {
    render: () => <RoiCalculator />,
    explainer: (
      <>
        <p>
          A free ROI (return on investment) calculator. Enter what you put in and what you got
          back — see your percentage return plus annualized rate over the holding period.
        </p>
        <p>
          ROI is useful for comparing investments, marketing campaigns, and business decisions on
          the same scale. Annualized ROI matters more than absolute: a 50% return in 5 years is
          8.4% annualized — less exciting than it sounds. Pair with our{" "}
          <a href="/guides/how-to-start-investing-with-100-dollars">investing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the cost (amount invested).",
      "Enter the return (final value).",
      "Enter the time period in years.",
      "Read simple ROI and annualized ROI.",
    ],
      faq: [
      {
        "q": "What's a good ROI?",
        "a": "For a business investment, 15–20 percent annualized over multiple years is considered strong. For stocks, 7 percent real returns is the historical average. Anything over 30 percent annualized over a long period is unusual and deserves scrutiny."
      },
      {
        "q": "Why does annualized ROI matter more than simple ROI?",
        "a": "A 100 percent return over ten years is much worse than a 100 percent return over one year. Annualized ROI converts any holding period to an apples-to-apples yearly rate, so you can compare across investments of different lengths."
      },
      {
        "q": "Does this account for inflation?",
        "a": "No — the output is nominal ROI. To convert to real ROI (after inflation), subtract the average inflation rate over the holding period. In a 3 percent inflation environment, a nominal 10 percent return is a real 7 percent return."
      }
    ],
  },
  "currency-converter": {
    render: () => <CurrencyConverter />,
    explainer: (
      <>
        <p>
          A free currency converter covering 15 major currencies. Rates are pulled live from the
          European Central Bank via the Frankfurter API and refresh each business day. If the
          service is ever unreachable, the tool falls back to stored reference rates so you still
          get an answer.
        </p>
        <p>
          Mid-market rates are what you&rsquo;ll see on Google or a financial ticker — the
          reference number between buyers and sellers. The rate you actually pay at a bank, card,
          or remittance service is usually 1–3% worse. For travel or a rough estimate, mid-market
          is fine. For larger transactions, compare against the quote your provider gives you.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount in the From currency.",
      "Pick From and To currencies — or press ⇄ to swap them.",
      "Override the rate if your provider quoted a different number.",
      "Read the converted amount and the rate used.",
    ],
      faq: [
      {
        "q": "Are the exchange rates live?",
        "a": "Rates are pulled from a public ECB-derived feed and refresh roughly daily. They're accurate enough for travel and back-of-envelope work, but for wire transfers or large FX trades, use your bank's actual quote — retail rates include a 1–3 percent markup we don't price in."
      },
      {
        "q": "Why does my bank charge a different rate than this shows?",
        "a": "The midmarket rate we show is the wholesale rate between banks. Retail banks add a spread (typically 1–3 percent) plus sometimes a flat fee. Services like Wise or Revolut often charge closer to the midmarket rate."
      },
      {
        "q": "Can I convert crypto?",
        "a": "Not currently — this tool handles fiat currencies only (USD, EUR, GBP, JPY, CAD, AUD, CHF, and similar majors). Crypto prices are volatile enough that a \"converter\" snapshot is misleading within minutes."
      }
    ],
  },
  "habit-tracker": {
    render: () => <HabitTracker />,
    explainer: (
      <>
        <p>
          A simple free habit tracker for one habit over 14 days. Check each day off as you do
          it; your current streak appears instantly. Runs in your browser, no sign-up, no sync.
        </p>
        <p>
          The point is visible progress. Seeing 9 checkmarks in a row is the strongest
          motivation most people need to make it 10. For deeper habit theory, see our{" "}
          <a href="/guides/how-to-build-good-habits">habits guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Name your habit (something specific and daily).",
      "Check the box for each day you do it.",
      "Watch your streak grow — aim to not break the chain.",
      "Come back daily; the grid is your contract with yourself.",
    ],
  },
  "reading-time-estimator": {
    render: () => <ReadingTimeEstimator />,
    explainer: (
      <>
        <p>
          A free reading time estimator. Paste any text; get an estimated reading time based on
          average adult reading speed (230 words per minute by default). Adjust the WPM for
          slow, average, or fast readers.
        </p>
        <p>
          Useful for blog post previews, course content, or planning how long a chapter will
          take. Remember: comprehension drops if you speed past 300-400 WPM, so faster
          isn&rsquo;t always better.
        </p>
      </>
    ),
    howToUse: [
      "Paste text into the box.",
      "Adjust WPM if needed (230 is the adult average).",
      "Read the estimated time in minutes:seconds.",
      "Use for post previews, course planning, or script timing.",
    ],
      faq: [
      { q: "How is reading time calculated?", a: "Based on average adult reading speed: 238 words per minute for general prose, 100 for technical content, and 300+ for light fiction. The calculator lets you pick the right profile for your audience." },
      { q: "Does it count images or code?", a: "Images add a small constant (about 12 seconds per image); code blocks are read more slowly (about 100 words per minute) because each line requires interpretation." },
      { q: "Why do blog posts show reading time?", a: "It helps readers decide whether to commit to the article. Research shows that showing an estimated reading time lifts completion rate modestly — people prefer knowing the cost upfront." },
      { q: "How accurate is the estimate?", a: "Within about 20% for most adult readers on most content. Individual speed varies wildly with content density, prior knowledge, and interest." },
    ],
  },
  "meeting-cost-calculator": {
    render: () => <MeetingCostCalculator />,
    explainer: (
      <>
        <p>
          A free meeting cost calculator. Enter average salary, number of attendees, and duration;
          see exactly what the meeting costs the company. The number is usually sobering.
        </p>
        <p>
          Use it to justify shorter meetings, smaller attendee lists, or async alternatives. A
          10-person hour-long meeting with $120k average salaries costs $600. Worth it for
          important decisions; wasted for a status update that could be a Slack message.
        </p>
      </>
    ),
    howToUse: [
      "Enter average annual salary of attendees.",
      "Enter number of attendees.",
      "Enter meeting duration in minutes.",
      "Read the dollar cost of the meeting.",
    ],
  },
  "time-zone-converter": {
    render: () => <TimeZoneConverter />,
    explainer: (
      <>
        <p>
          A free time zone converter covering 17 major zones. Pick a time in one zone; see the
          equivalent across all the others instantly. Uses your browser&rsquo;s native Intl API
          for accuracy, including DST.
        </p>
        <p>
          For scheduling meetings, travel, or remote work across time zones, a quick visual
          conversion saves headaches. See our <a href="/guides/how-to-work-remotely">remote work
          guide</a> for more.
        </p>
      </>
    ),
    howToUse: [
      "Pick your reference time zone.",
      "Set the reference date and time.",
      "Toggle which zones to display.",
      "Read the converted times side-by-side.",
    ],
      faq: [
      {
        "q": "Does this handle daylight saving time (DST)?",
        "a": "Yes. The browser's Intl API is DST-aware, so a 9 AM meeting in New York correctly shows 2 PM London in summer and 1 PM London in winter. The conversion matches what a native calendar app would show."
      },
      {
        "q": "Why does my city not appear in the list?",
        "a": "The IANA time zone database uses a canonical city per zone (e.g., America/Chicago for all of the US Central Time zone). If your city isn't listed, pick the nearest one in the same zone — the offset is identical."
      },
      {
        "q": "Can I convert a meeting time across more than two zones?",
        "a": "Yes, toggle additional zones in the display list. Useful for distributed teams — set one reference time and read the local time in four or five places at once."
      }
    ],
  },
  "ideal-weight-calculator": {
    render: () => <IdealWeightCalculator />,
    explainer: (
      <>
        <p>
          A free ideal weight calculator using the four standard formulas — Devine, Robinson,
          Miller, and Hamwi — so you can compare across them. Enter sex and height; get
          estimates in kg and lb.
        </p>
        <p>
          Ideal weight formulas are rough guidelines. They don&rsquo;t account for frame size,
          muscle mass, or body composition, so athletes often fall outside the range despite
          being in excellent health. Treat these as one reference point among several.
        </p>
      </>
    ),
    howToUse: [
      "Pick your sex.",
      "Enter your height in cm.",
      "Compare results across the four formulas.",
      "Use as rough reference, not as a strict target.",
    ],
      faq: [
      { q: "Which formula does the calculator use?", a: "We show results from four widely cited formulas: Devine, Robinson, Miller, and Hamwi. Each gives a slightly different estimate — 'ideal weight' isn't a precise medical concept, so seeing the range is more useful than a single number." },
      { q: "Is ideal weight the same as healthy weight?", a: "No — ideal-weight formulas were originally designed for medication dosing, not general health. For a health-oriented target, use BMI (range 18.5–24.9) or a body-fat percentage in a healthy range." },
      { q: "Does age affect ideal weight?", a: "The classic formulas don't factor in age. For adults, weight tends to naturally trend slightly higher with age without health concern — absolute targets that were calibrated in the 1970s may be over-restrictive." },
      { q: "Is this advice?", a: "No. It's a calculator. Any material weight-change goal should involve your doctor, especially if you have underlying conditions or are pregnant." },
    ],
  },
  "running-pace-calculator": {
    render: () => <RunningPaceCalculator />,
    explainer: (
      <>
        <p>
          A free running pace calculator. Enter distance and finish time; get pace per kilometer,
          pace per mile, and speed in both km/h and mph. Works for training runs and race
          planning.
        </p>
        <p>
          Knowing your pace is essential for structured training and pacing strategy on race
          day. Pair with our <a href="/guides/how-to-start-running">running guide</a> for
          beginner programs that use pace targets.
        </p>
      </>
    ),
    howToUse: [
      "Enter your distance (km or miles).",
      "Enter your finish time (hours, minutes, seconds).",
      "Read pace per km and per mile.",
      "Check speed in km/h and mph for context.",
    ],
      faq: [
      { q: "What's the difference between pace and speed?", a: "Pace is time-per-distance (e.g. 8:30 per mile), speed is distance-per-time (e.g. 7 mph). Runners usually think in pace; cyclists in speed." },
      { q: "Can I calculate race splits?", a: "Yes — enter your target finish time and race distance, and the calculator shows your target pace plus 1-mile/km splits." },
      { q: "Does it account for altitude or heat?", a: "No — pace calculations assume ideal conditions. For altitude adjustment, add roughly 2% per 1,000 ft above ~3,000 ft; heat cost is more variable." },
      { q: "What's a 'good' marathon pace?", a: "Highly individual. 9:00/mile is typical for a mid-pack recreational runner. Sub-8:00/mile puts you around top 25%. Elite pace is under 5:00/mile." },
    ],
  },
  "macro-calculator": {
    render: () => <MacroCalculator />,
    explainer: (
      <>
        <p>
          A free macro calculator. Enter daily calories, weight, and goal; get protein, fat, and
          carb targets. Protein is set at 1g per pound of bodyweight (a solid general rule), fat
          at 28% of calories, carbs fill the rest.
        </p>
        <p>
          These are starting targets, not prescriptions. Adjust over 2-3 weeks based on how your
          body responds. Pair with our <a href="/guides/how-to-eat-healthy-on-a-budget">healthy
          eating guide</a> and the <a href="/tools/calorie-calculator">calorie calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your daily calorie target.",
      "Enter your weight in pounds.",
      "Pick your goal (cut, maintain, bulk).",
      "Read your protein, fat, and carb targets in grams.",
    ],
      faq: [
      { q: "What are macros?", a: "Short for macronutrients: protein, carbohydrates, and fat — the three categories that provide calories in your diet. 'Tracking macros' means hitting target grams of each per day." },
      { q: "Which split is right for me?", a: "Common starting points: 40% carb / 30% protein / 30% fat for general maintenance; 30/40/30 or 20/45/35 for muscle-building; higher-fat splits for keto. The calculator presets these." },
      { q: "Are the calorie targets accurate?", a: "The calculator uses the Mifflin-St Jeor equation (the most accurate general-purpose BMR formula) combined with an activity multiplier. Individual variation can be 10–15%." },
      { q: "Do I need to hit macros exactly?", a: "No. Being within ~5g of each target is close enough. Macro tracking is a tool, not a religion — consistent directional bias matters far more than perfection." },
    ],
  },
  "text-reverser": {
    render: () => <TextReverser />,
    explainer: (
      <>
        <p>
          A free text reverser. Reverse by characters, words, or lines. Useful for puzzles,
          creative writing experiments, or quickly flipping a CSV or list. Everything runs in
          your browser.
        </p>
        <p>
          A niche tool, but when you need it, you really need it. Pair with the{" "}
          <a href="/tools/case-converter">case converter</a> for more text manipulation.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Pick reverse mode: characters, words, or lines.",
      "Read the reversed output instantly.",
      "Copy the result with one click.",
    ],
  },
  "readability-score-checker": {
    render: () => <ReadabilityScoreChecker />,
    explainer: (
      <>
        <p>
          A free readability score checker using the Flesch Reading Ease formula. Paste text;
          get a score plus plain-English interpretation (roughly: 60-70 is web-friendly, below
          30 is academic).
        </p>
        <p>
          Lower-grade writing often ranks better on Google and sees more engagement. For blog
          posts, target 60+. For marketing copy, 70+. See our{" "}
          <a href="/guides/how-to-write-better">writing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Read the Flesch score and interpretation.",
      "Check syllable, word, and sentence counts.",
      "Shorten sentences or simpler words to boost the score.",
    ],
      faq: [
      {
        "q": "What's a good Flesch Reading Ease score?",
        "a": "For blog posts and web copy, aim for 60–70 (fairly easy to read, 8th–9th grade level). For technical documentation, 50–60 is fine. For legal or academic writing, 30–50 is the norm. Anything under 30 is unnecessarily hard to read."
      },
      {
        "q": "Does Google use Flesch scores to rank pages?",
        "a": "Not directly — Google has stated readability isn't a ranking factor. But lower reading grade levels correlate with higher dwell time and lower bounce rate, which are signals Google does use. So readable writing helps rankings indirectly."
      },
      {
        "q": "How do I improve my score quickly?",
        "a": "Split long sentences at conjunctions, replace uncommon words with common synonyms, and cut filler phrases (\"in order to\" → \"to\", \"due to the fact that\" → \"because\"). Those three changes usually move a score 10–15 points."
      }
    ],
  },
  "typing-speed-test": {
    render: () => <TypingSpeedTest />,
    explainer: (
      <>
        <p>
          A free 60-second typing speed test. Type the passage as accurately as possible; get
          your WPM (words per minute) and accuracy. Runs entirely in your browser.
        </p>
        <p>
          Average typing speed is 40 WPM; professional typists often exceed 75 WPM. Speed
          matters less than accuracy — a 50 WPM typist with 98% accuracy outperforms a 70 WPM
          typist with 85% accuracy in real work.
        </p>
      </>
    ),
    howToUse: [
      "Click Start and begin typing the passage.",
      "Type exactly — errors count against accuracy.",
      "Stop at 60 seconds.",
      "Read your WPM and accuracy percentages.",
    ],
      faq: [
      { q: "What WPM is considered good?", a: "40 WPM is average for adults; 60+ is proficient; 80+ is fast; 100+ is professional-grade. Competitive typists clear 150 WPM." },
      { q: "Does the test penalize mistakes?", a: "Yes — WPM is calculated from correctly-typed characters only. Uncorrected mistakes lower your effective WPM." },
      { q: "Is a longer test more accurate?", a: "Yes — a 60-second test gives you a much more stable number than 15 seconds. The variability in shorter tests is mostly noise." },
      { q: "Can typing speed be improved?", a: "Absolutely. The biggest gains come from using the correct home-row technique (most people 'hunt and peck' and plateau around 40 WPM). Free practice sites like Keybr and Monkeytype can take you to 60+ WPM in a few weeks." },
    ],
  },
  "json-to-csv": {
    render: () => <JsonToCsv />,
    explainer: (
      <>
        <p>
          A free JSON to CSV converter. Paste an array of JSON objects; get a downloadable CSV
          with all keys as headers. Handles nested strings, commas, and quotes correctly.
        </p>
        <p>
          Useful for migrating data between APIs, importing into spreadsheets, or handing data
          to non-technical colleagues who live in Excel.
        </p>
      </>
    ),
    howToUse: [
      "Paste a JSON array of objects into the input.",
      "Click Convert.",
      "Copy the CSV output or download as a file.",
      "Use the output in Excel, Google Sheets, or your database.",
    ],
      faq: [
      { q: "What if my JSON is nested?", a: "The converter supports one level of nesting via dot notation ('user.name' becomes a column). Deeper nesting is flattened using the same convention. For complex nested structures, consider preprocessing with jq first." },
      { q: "Will it export Excel-compatible CSVs?", a: "Yes — by default it uses CRLF line endings and comma separators, which Excel opens cleanly. Switch to semicolon separator for European Excel locales." },
      { q: "What about arrays inside fields?", a: "Arrays are serialized as JSON strings and quoted. If you want one row per array element, restructure the JSON first — flatten the array at the top level." },
      { q: "Does it escape special characters?", a: "Yes — RFC 4180-compliant escaping. Commas, quotes, and newlines inside field values are handled correctly." },
    ],
  },
  "base64-encoder-decoder": {
    render: () => <Base64EncoderDecoder />,
    explainer: (
      <>
        <p>
          A free base64 encoder and decoder. Works in both directions, handles UTF-8 correctly
          (emojis, accented characters). Everything runs locally in your browser.
        </p>
        <p>
          Base64 is used in APIs, data URIs, email attachments, and JWT tokens. If you work with
          APIs or web development, you&rsquo;ll hit it weekly. See our{" "}
          <a href="/guides/what-is-an-api">API guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste text in the input.",
      "Click Encode to convert to base64.",
      "Click Decode to convert back to plain text.",
      "Copy the result with one click.",
    ],
    useCases: [
      "Embedding small images in CSS as data URIs.",
      "Decoding the payload of a JWT to inspect claims (without verifying the signature).",
      "Encoding binary data for safe transport in JSON APIs.",
      "Generating Basic Auth headers for testing an API.",
    ],
    whenToUse: [
      "Any time text/binary data must travel through a text-only channel (JSON, URL, email).",
      "Debugging API responses that include base64 blobs.",
      "Building HTTP Basic Auth headers manually.",
    ],
    whenNotToUse: [
      "As encryption or obfuscation — base64 is trivially reversible, not secure.",
      "For large binary files (base64 inflates size by ~33%; use real uploads instead).",
      "When your language/runtime already has a built-in encoder — use that for production code.",
    ],
    example: {
      input: "Hello, World! 👋",
      output: "SGVsbG8sIFdvcmxkISDwn5GL",
      note: "Note the UTF-8 emoji is preserved across the round-trip. ASCII-only base64 libraries sometimes mangle Unicode.",
    },
    faq: [
      {
        q: "Is base64 encryption?",
        a: "No. Base64 is encoding, not encryption. Anyone can decode it instantly. Never use base64 to 'hide' passwords, tokens, or private data.",
      },
      {
        q: "Why does base64 text contain padding characters like '=' at the end?",
        a: "Base64 encodes input in 3-byte chunks. When the input length isn't a multiple of 3, '=' pads the output to a multiple of 4 characters. Some decoders tolerate missing padding, others reject it.",
      },
    ],
  },
  "url-encoder-decoder": {
    render: () => <UrlEncoderDecoder />,
    explainer: (
      <>
        <p>
          A free URL encoder and decoder. Handles query strings, special characters, and Unicode
          safely. Everything happens in your browser.
        </p>
        <p>
          URL encoding is required whenever you put special characters in a URL — query
          parameters, redirect paths, API endpoints. Errors here cause cryptic bugs; this tool
          saves the debugging time.
        </p>
      </>
    ),
    howToUse: [
      "Paste a URL or text in the input.",
      "Click Encode to escape special characters.",
      "Click Decode to un-escape percent-encoded text.",
      "Copy the result with one click.",
    ],
      faq: [
      {
        "q": "When do I need URL encoding?",
        "a": "Any time a URL contains reserved characters (space, #, ?, &, /, :, +, =) that aren't being used in their special role. Form submissions, query strings, and API paths are the common cases — a user input with a space becomes %20 when sent as a query parameter."
      },
      {
        "q": "What's the difference between encoding a query string and a path component?",
        "a": "Path components shouldn't encode the forward slash; query string components must encode &, =, +, and space as %2B or +. JavaScript's encodeURIComponent is the stricter version and usually what you want for query params."
      },
      {
        "q": "Can I safely paste an API token or secret here?",
        "a": "Yes — the encoder runs entirely in your browser. Nothing is sent to a server, so you can encode bearer tokens, database connection strings, or webhook URLs without exposing them."
      }
    ],
  },
  "regex-tester": {
    render: () => <RegexTester />,
    explainer: (
      <>
        <p>
          A free regex tester. Enter a pattern and flags; test against any string and see all
          matches highlighted. Useful for building and debugging regular expressions before
          using them in code.
        </p>
        <p>
          Regex is both powerful and unforgiving. Test patterns here until they behave correctly,
          then paste into your codebase. See our{" "}
          <a href="/guides/how-to-debug-code-effectively">debugging guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your regex pattern.",
      "Set flags (g, i, m, s) as needed.",
      "Paste test text into the input.",
      "Review matches highlighted live.",
    ],
    useCases: [
      "Validating an email or phone pattern before pasting it into form validation code.",
      "Building a search-and-replace expression for VS Code or editor macros.",
      "Debugging why a regex doesn't match the input you expected it to.",
      "Testing capture groups before using them in backreferences.",
    ],
    whenToUse: [
      "Building or iterating on a new regex pattern.",
      "Comparing behavior of /g vs no /g, or case-insensitive vs case-sensitive.",
      "Exploring what a pattern matches across sample text.",
    ],
    whenNotToUse: [
      "Parsing HTML or deeply nested structures — use a real parser instead of regex.",
      "Performance-critical matching on huge inputs (benchmark in your target runtime).",
      "PCRE-only features — browser JavaScript regex has a different (slightly smaller) feature set.",
    ],
    example: {
      input: "Pattern: \\b\\w+@\\w+\\.\\w+\\b\nFlags: g\nText: Contact us at hello@example.com or sales@example.co",
      output: "2 matches:\nhello@example.com\nsales@example.co",
      note: "This is a *rough* email check — real email validation is vastly more complex (RFC 5321). For form input, a lightweight check is usually sufficient; the real validation is sending a confirmation email.",
    },
    faq: [
      {
        q: "Why does my pattern match here but not in my code?",
        a: "Flags, escape rules, and regex flavor. Browser JavaScript uses ECMAScript regex. Python, Go, and PCRE each have their own dialect with slightly different syntax. Double-check lookbehind, named groups, and Unicode classes.",
      },
      {
        q: "How do I make my regex case-insensitive?",
        a: "Add the 'i' flag. So /hello/i matches 'Hello', 'HELLO', and 'hello'.",
      },
    ],
  },
  "uuid-generator": {
    render: () => <UuidGenerator />,
    explainer: (
      <>
        <p>
          A free UUID (v4) generator. Generates cryptographically random UUIDs in your browser.
          Batch generation up to 50 at a time.
        </p>
        <p>
          UUIDs are essential for database primary keys, session IDs, and anywhere you need a
          globally unique identifier that can&rsquo;t be guessed. Uses{" "}
          <code>crypto.randomUUID()</code> when available, cryptographic fallback otherwise.
        </p>
      </>
    ),
    howToUse: [
      "Set how many UUIDs to generate.",
      "Click Generate.",
      "Copy individual UUIDs or the whole batch.",
      "Regenerate any time for a fresh batch.",
    ],
      faq: [
      {
        "q": "What's the difference between UUID v4 and v7?",
        "a": "v4 is fully random (128 bits of entropy). v7 includes a 48-bit timestamp prefix, making it sortable by creation time. Use v4 for maximum unlinkability (session IDs), v7 when you want database-friendly insertion order."
      },
      {
        "q": "Are these UUIDs truly unique?",
        "a": "v4 UUIDs use 122 bits of randomness — the probability of a collision in a billion-entry table is below one in a quintillion. For all practical purposes they're unique, but they are not cryptographically secret — they should not be used as authentication tokens."
      },
      {
        "q": "Can I bulk-generate thousands for test data?",
        "a": "Yes — the generator handles batches of 1,000+ in the browser without lag. Copy the full batch with one click and paste into a fixture file or SQL insert statement."
      }
    ],
  },
  "markdown-to-html": {
    render: () => <MarkdownToHtml />,
    explainer: (
      <>
        <p>
          A free markdown to HTML converter. Paste markdown; get clean HTML output. Supports
          headings, bold, italic, links, lists, code blocks, and inline code.
        </p>
        <p>
          Useful for quickly converting README content, blog drafts, or chat messages to HTML.
          For complex documents, use a dedicated markdown processor in your build pipeline.
        </p>
      </>
    ),
    howToUse: [
      "Paste markdown into the input.",
      "Read the HTML output instantly.",
      "Copy the HTML with one click.",
      "Paste into a CMS, email, or site editor.",
    ],
      faq: [
      {
        "q": "Which markdown flavor does this support?",
        "a": "CommonMark with a few GitHub-flavored extensions: tables, fenced code blocks, task lists, and autolinks. It should match what you see rendered on GitHub.com for most content."
      },
      {
        "q": "Can I paste the output into WordPress or Ghost?",
        "a": "Yes. Switch the editor into HTML mode and paste. WordPress classic editor, Ghost, Substack, and most other CMSes accept pasted HTML directly in the code/source view."
      },
      {
        "q": "Does it sanitize dangerous HTML?",
        "a": "Raw HTML inside your markdown is preserved as-is (CommonMark default). If you're going to paste output into a public-facing site and your source markdown may contain untrusted HTML, run it through a sanitizer like DOMPurify before publishing."
      }
    ],
  },
  "length-converter": {
    render: () => <LengthConverter />,
    explainer: (
      <>
        <p>
          A free length converter supporting mm, cm, m, km, inches, feet, yards, and miles.
          Precise conversions using the international standard metric-to-imperial ratios.
        </p>
        <p>
          Handy for DIY projects, travel, international shopping, and homework. See our general{" "}
          <a href="/tools/unit-converter">unit converter</a> for more categories.
        </p>
      </>
    ),
    howToUse: [
      "Enter a value in the From field.",
      "Pick From and To units.",
      "Read the converted value instantly.",
      "Swap units for the reverse conversion.",
    ],
      faq: [
      { q: "Which length units are supported?", a: "Metric (mm, cm, m, km), US customary (inch, foot, yard, mile), and several scientific/niche units (light-year, parsec, nautical mile, furlong)." },
      { q: "Does the converter handle feet + inches?", a: "Yes — enter a value like 5'10\" and it parses to the total inches, then converts to your target unit." },
      { q: "What's the exact inch-to-cm conversion?", a: "1 inch = 2.54 cm, exactly (this was standardized internationally in 1959). All length conversions derive from this definition." },
      { q: "Can I bookmark a conversion?", a: "Yes — the URL captures your input and unit selections, so you can share a pre-filled conversion." },
    ],
  },
  "speed-converter": {
    render: () => <SpeedConverter />,
    explainer: (
      <>
        <p>
          A free speed converter covering m/s, km/h, mph, knots, and ft/s. Uses exact conversion
          factors. Runs entirely in the browser.
        </p>
        <p>
          Useful for physics homework, pilot/sailing navigation, running pace analysis, and
          converting car speedometers when traveling. Pair with our{" "}
          <a href="/tools/running-pace-calculator">running pace calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter a speed value.",
      "Pick From and To units.",
      "Read the converted value.",
      "Switch units any time.",
    ],
  },
  "random-name-generator": {
    render: () => <RandomNameGenerator />,
    explainer: (
      <>
        <p>
          A free random name generator. Pick gender (male, female, any) and count. Uses common
          English first and last names.
        </p>
        <p>
          Useful for fiction writing, mock data for apps, testing forms, or when you need a
          placeholder that isn&rsquo;t &ldquo;John Doe.&rdquo;
        </p>
      </>
    ),
    howToUse: [
      "Pick gender (male, female, or any).",
      "Set how many names to generate.",
      "Click Generate.",
      "Copy individual names or the list.",
    ],
      faq: [
      { q: "Where do the names come from?", a: "From a curated open-source list of common first names and surnames across multiple locales. The dataset is static and does not correspond to any real person." },
      { q: "Can I filter by gender or locale?", a: "Yes — choose gender (any, male, female, neutral) and locale (US, UK, DE, FR, ES, JP transliterated)." },
      { q: "Is this suitable for characters in a novel?", a: "Yes — a common use case. Generate a few, pick the ones that fit, and check them against a web search to make sure you're not accidentally using a famous name." },
      { q: "Can I generate a CSV of names?", a: "Yes — use the 'generate batch' option and copy the comma-separated output into any spreadsheet." },
    ],
  },
  "random-number-generator": {
    render: () => <RandomNumberGenerator />,
    explainer: (
      <>
        <p>
          A free random number generator. Set min, max, count, and whether results must be
          unique. Uses standard JavaScript randomness — fine for most casual uses.
        </p>
        <p>
          Useful for raffles, lotteries, game randomness, or anywhere you need a random pick
          from a range. For cryptographic randomness, use our{" "}
          <a href="/tools/uuid-generator">UUID generator</a> instead.
        </p>
      </>
    ),
    howToUse: [
      "Set min and max values.",
      "Set how many numbers to generate.",
      "Toggle unique-only if needed.",
      "Click Generate — copy or regenerate.",
    ],
      faq: [
      { q: "Is this truly random?", a: "The generator uses the browser's crypto.getRandomValues API when available, which provides cryptographically strong random numbers. For non-secure contexts (older browsers) it falls back to Math.random, which is pseudo-random." },
      { q: "Can I generate without duplicates?", a: "Yes — check the 'unique values' option and the generator will return a random sample without replacement." },
      { q: "Can I use it for a raffle or giveaway?", a: "For informal raffles, yes. For regulated giveaways (government lotteries, etc.), you likely need a certified RNG with audit logs — this tool doesn't provide those." },
      { q: "What's the max range?", a: "Safe integer range: -9,007,199,254,740,991 to 9,007,199,254,740,991. Beyond that, JavaScript loses precision." },
    ],
  },
  "decision-maker": {
    render: () => <DecisionMaker />,
    explainer: (
      <>
        <p>
          A free decision maker. Type options one per line; click Decide to pick one at random.
          Useful when you&rsquo;re genuinely stuck between options.
        </p>
        <p>
          When two choices feel equal, a coin flip can reveal your preference (your reaction to
          the result tells you what you actually wanted). For binary choices, use the{" "}
          <a href="/tools/coin-flip">coin flip</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type one option per line.",
      "Click Decide.",
      "Accept the result, or notice your reaction — that tells you what you wanted.",
      "Reset and try again with different options.",
    ],
      faq: [
      { q: "Is it really random?", a: "Yes — every option has an equal probability, selected using the browser's crypto.getRandomValues API." },
      { q: "Can I weight the options?", a: "Yes — enter a weight next to each option (1, 2, 3). The selector picks in proportion to the weights rather than equally." },
      { q: "How many options can I enter?", a: "Up to 100 for sane UI behavior. Beyond that, paste a list and use the 'random item' tool instead." },
      { q: "Is my list sent anywhere?", a: "No — everything runs in your browser and disappears when you close the tab." },
    ],
  },
  "color-converter": {
    render: () => <ColorConverter />,
    explainer: (
      <>
        <p>
          A free color converter that shows HEX, RGB, and HSL at once. Paste a
          hex code, tweak any channel, or use the native color picker — every
          other format updates instantly. Everything runs in your browser, so
          there&rsquo;s no lag and nothing to install.
        </p>
        <p>
          HEX is the design-handoff default (<code>#0f766e</code>), RGB is
          what browsers and CSS think in, HSL is the one that actually maps to
          how humans perceive color (hue, saturation, lightness). Swapping
          between them is one of the most common tasks in web design, brand
          tooling, and data-viz work — this tool makes it a one-click move.
        </p>
      </>
    ),
    howToUse: [
      "Paste a hex code or click the color picker swatch.",
      "Edit any R, G, B, H, S, or L value — the rest follow.",
      "Use the Copy button next to any format to copy it to your clipboard.",
      "Supports 3-digit and 6-digit hex; 8-digit hex is truncated to RGB.",
    ],
      faq: [
      { q: "Which color formats are supported?", a: "HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK, and CSS named colors. Conversions are lossless between RGB-based formats; HSL and CMYK are calculated conversions." },
      { q: "Why do HEX and HSL values look slightly different on round-trip?", a: "Floating-point rounding in HSL math occasionally yields colors that differ by 1 in a channel. Both representations are visually identical — the hue/saturation/lightness values are just approximations." },
      { q: "Can I convert brand colors (Pantone)?", a: "Not directly — Pantone is a proprietary, physical ink system with no perfect digital equivalent. Use Pantone's own bridge values to get a close HEX match." },
      { q: "What's the difference between RGB and RGBA?", a: "RGBA adds an alpha channel (transparency) from 0 to 1. Use RGBA when you need a semi-transparent color on a webpage; stick with RGB for solid fills." },
    ],
  },
  "unix-timestamp-converter": {
    render: () => <UnixTimestampConverter />,
    explainer: (
      <>
        <p>
          A free Unix timestamp converter. The current epoch ticks live at the
          top so you can grab &ldquo;right now&rdquo; in one click. Paste any
          timestamp to see it rendered as ISO 8601, local time, UTC, and how
          long ago (or from now) the moment falls. Go the other direction too:
          pick a date and read back Unix seconds and milliseconds.
        </p>
        <p>
          Unix timestamps are the internet&rsquo;s favorite date format:
          timezone-agnostic, fixed-width, easy to sort. They crop up in API
          payloads, database columns, JWT tokens, and log lines. This tool
          handles both second and millisecond precision, which matters because
          half the world&rsquo;s APIs use one and half use the other.
        </p>
      </>
    ),
    howToUse: [
      "To read a timestamp: paste it and pick seconds or milliseconds.",
      "To get the current epoch: click Use now.",
      "To encode a date: enter it in the date/time field at the bottom.",
      "Copy any output with the per-field Copy button.",
    ],
      faq: [
      { q: "What is a Unix timestamp?", a: "The number of seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC — the 'Unix epoch'. Widely used in programming because it's timezone-neutral and easy to arithmetic on." },
      { q: "Seconds or milliseconds?", a: "JavaScript and most databases use milliseconds; most backend languages (Python, Ruby, Go) default to seconds. The converter auto-detects based on the magnitude of your input (a 13-digit value is assumed milliseconds)." },
      { q: "What about timezones?", a: "Unix timestamps are inherently UTC. When we display a human-readable date, we show both UTC and your browser's local timezone." },
      { q: "Will Unix timestamps overflow?", a: "32-bit signed timestamps overflow on January 19, 2038 — the 'Y2038 problem'. 64-bit timestamps (used by modern systems) are safe for ~292 billion years." },
    ],
  },
  "number-base-converter": {
    render: () => <NumberBaseConverter />,
    explainer: (
      <>
        <p>
          A free number base converter with binary, octal, decimal, and
          hexadecimal on screen at the same time. Type in any one field — the
          others update instantly. Uses <code>BigInt</code>, so arbitrarily
          large numbers work without precision loss.
        </p>
        <p>
          Useful for low-level debugging (memory addresses in hex, bitmasks in
          binary), CSS color math (hex ↔ decimal channels), permissions
          (octal file modes like 755), and CTF/puzzle work. Prefixes like{" "}
          <code>0x</code>, <code>0b</code>, and <code>0o</code> are accepted in
          the matching field.
        </p>
      </>
    ),
    howToUse: [
      "Type a number in any field — binary, octal, decimal, or hex.",
      "Watch the other three update live.",
      "Tap Copy next to any field to grab that representation.",
      "Negative numbers and BigInt-sized values are supported.",
    ],
      faq: [
      { q: "Which bases are supported?", a: "Binary (2), octal (8), decimal (10), hex (16), and arbitrary bases from 2 to 36." },
      { q: "Can I convert negative numbers?", a: "Yes — negative numbers are represented with a leading minus sign, consistent with how most programming languages display them." },
      { q: "Does it support floating-point conversion?", a: "Yes, within JavaScript's double-precision float range — though floating-point representation in bases other than 10 can produce repeating fractions." },
      { q: "What about two's complement?", a: "The converter displays signed values with a minus sign. For bit-level two's complement representation (e.g. 8-bit), enable the 'show binary as two's complement' option." },
    ],
  },
  "csv-to-json": {
    render: () => <CsvToJson />,
    explainer: (
      <>
        <p>
          A free CSV to JSON converter that runs entirely in your browser.
          Paste CSV, pick the delimiter (comma, semicolon, tab, or pipe), and
          get a JSON array of objects — with the first row as keys by default.
          Handles quoted fields with embedded commas, escaped quotes, and both
          Unix and Windows line endings.
        </p>
        <p>
          CSV is the universal data language everyone exports but no one enjoys
          parsing. JSON is what every API speaks. Going between them is a
          constant chore — this tool makes it a paste-and-copy in three
          seconds. For the opposite direction, see our{" "}
          <a href="/tools/json-to-csv">JSON to CSV converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste your CSV into the input box.",
      "Pick the delimiter if it's not a comma.",
      "Toggle 'First row is header' if your CSV doesn't have one.",
      "Copy the JSON output or paste it straight into your code.",
    ],
      faq: [
      { q: "What quoting dialect does the converter support?", a: "RFC 4180 — the standard CSV spec. Fields containing commas, quotes, or newlines should be wrapped in double quotes, with embedded quotes escaped as two quote characters." },
      { q: "Does the first row become object keys?", a: "Yes. The first row of your CSV is treated as headers; every subsequent row becomes an object with those headers as keys. Uncheck 'first row is headers' to get an array of arrays instead." },
      { q: "Can it handle large CSV files?", a: "Up to about 5 MB comfortably. Larger files may slow your browser since parsing happens client-side. For multi-GB files, use a desktop tool or a streaming parser like PapaParse." },
      { q: "Is my CSV sent to a server?", a: "No. Parsing happens entirely in your browser — nothing you paste leaves the tab." },
    ],
  },
  "yaml-json-converter": {
    render: () => <YamlJsonConverter />,
    explainer: (
      <>
        <p>
          A free two-way YAML ↔ JSON converter. Paste YAML to get JSON, or
          paste JSON to get clean YAML — then hit Swap to bounce in the other
          direction with the output promoted to the new input. Supports nested
          mappings, block and flow sequences, strings, numbers, booleans, and
          null.
        </p>
        <p>
          YAML is the config-file default for Kubernetes, GitHub Actions,
          Docker Compose, Ansible, and most dev tooling. JSON is the default
          for APIs and JavaScript. Translating between them is an everyday
          task. Tip: YAML disallows tab characters in indentation — if a paste
          errors, check for mixed tabs and spaces.
        </p>
      </>
    ),
    howToUse: [
      "Pick the direction you want: YAML → JSON or JSON → YAML.",
      "Paste or type in the top box.",
      "Read the output instantly in the bottom box — errors show inline.",
      "Hit Swap to flip direction and continue iterating.",
    ],
      faq: [
      { q: "Does it preserve comments?", a: "YAML-to-JSON loses comments (JSON doesn't support them). JSON-to-YAML has no comments to preserve. For comment-critical conversions, use a tool like yq which can preserve some metadata." },
      { q: "What about YAML anchors and aliases?", a: "The converter expands anchors and aliases during YAML-to-JSON conversion — the resulting JSON has each referenced value inlined." },
      { q: "Which YAML spec?", a: "YAML 1.2 — the current standard. This handles the 'Norway problem' (no as boolean) correctly, unlike older 1.1 parsers." },
      { q: "Max file size?", a: "Up to about 2 MB for smooth browser performance. Larger documents may cause UI lag since parsing happens client-side." },
    ],
  },
  "html-to-markdown": {
    render: () => <HtmlToMarkdown />,
    explainer: (
      <>
        <p>
          A free HTML to Markdown converter. Paste any HTML — a blog export, a
          rich-text editor dump, an AI-generated page — and get clean Markdown
          out. Handles headings, inline formatting, links, images, lists,
          blockquotes, code blocks, and horizontal rules. Script, style, and
          tracking tags are stripped automatically.
        </p>
        <p>
          Useful for migrating a WordPress blog to a static site, dropping
          rich content into a Markdown-first CMS, cleaning up Notion or Google
          Docs exports, or converting AI-generated HTML back into something
          Git-friendly. The counterpart tool is our{" "}
          <a href="/tools/markdown-to-html">Markdown to HTML converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type HTML into the input box.",
      "Read the Markdown output instantly in the second box.",
      "Copy the result with one click.",
      "Tables and heavily nested HTML may need a small manual cleanup.",
    ],
      faq: [
      { q: "Which HTML elements are supported?", a: "Headings (h1–h6), paragraphs, links, images, lists, blockquotes, code blocks, inline code, emphasis, strong, tables, and horizontal rules. Unknown elements are stripped." },
      { q: "What about inline styles?", a: "Dropped — markdown doesn't support arbitrary CSS. If your HTML relies on inline styles, consider outputting MDX or keeping HTML." },
      { q: "Will it handle a full web page?", a: "It will, but the output will include navigation and unrelated content. For 'extract the article', paste only the main content or use a reader-mode extraction first." },
      { q: "Does it escape special characters?", a: "Yes — asterisks, underscores, and other markdown-significant characters in your HTML text are escaped with backslashes so they render as text rather than formatting." },
    ],
  },
  "image-format-converter": {
    render: () => <ImageFormatConverter />,
    explainer: (
      <>
        <p>
          A free image format converter for JPG, PNG, and WebP. Drop a file,
          pick the output format, tweak the quality slider if needed, and
          download. Everything runs on your device — the image is never
          uploaded anywhere, which matters for screenshots, private photos, or
          sensitive work.
        </p>
        <p>
          Quick guidance: WebP is smaller than JPG at the same quality and now
          works everywhere except very old browsers. PNG is the right choice
          when you need lossless output or transparency. JPG is a safe fallback
          — if in doubt and the image isn&rsquo;t a logo or screenshot, JPG at
          85% quality is hard to beat.
        </p>
      </>
    ),
    howToUse: [
      "Drop or select your source image.",
      "Pick the target format: WebP, JPG, or PNG.",
      "For lossy formats, adjust the quality slider (85–90% is a sweet spot).",
      "Click Convert, then Download.",
    ],
  },
  "image-resizer": {
    render: () => <ImageResizer />,
    explainer: (
      <>
        <p>
          A free image resizer that runs entirely in your browser. Resize by
          exact pixels or by percentage, with aspect ratio locked by default.
          Pick your output format (PNG for lossless, JPG or WebP for smaller
          files) and download. No upload, no watermark, no queue.
        </p>
        <p>
          Common targets: 1200×630 for Open Graph social previews, 1080×1080
          for Instagram, 1920×1080 for desktop wallpapers, 2000px on the long
          edge for high-quality blog hero images. When in doubt, match what the
          platform suggests — you&rsquo;ll avoid their server-side recompression
          artefacts.
        </p>
      </>
    ),
    howToUse: [
      "Drop your image into the upload box.",
      "Set a target width and height, or use the Percent slider.",
      "Keep 'Lock aspect' on unless you mean to stretch the image.",
      "Pick an output format and click Resize.",
    ],
      faq: [
      { q: "Does the resizer keep aspect ratio?", a: "By default yes — enter one dimension and the other is calculated. Toggle 'free' mode to resize independently, which distorts the image." },
      { q: "Which formats can I resize?", a: "JPG, PNG, WebP, and GIF. Animated GIFs resize to the first frame only; use a dedicated GIF editor for animation-preserving resize." },
      { q: "What quality setting should I use for JPG?", a: "80–85 is the modern sweet spot — near-invisible quality loss with 50–70% file size savings. Below 70 you'll see artifacts in detailed areas." },
      { q: "Is the image uploaded anywhere?", a: "No. Resizing runs in your browser using the Canvas API. Your file never leaves the tab." },
    ],
  },
  "image-compressor": {
    render: () => <ImageCompressor />,
    explainer: (
      <>
        <p>
          A free image compressor for JPG and WebP. Drop a photo, pick a
          quality level, optionally cap the longest side, and get a much
          smaller file — everything processed in your browser with no upload.
          Typical 10–20 MB phone photos shrink to 300–800 KB with no visible
          loss.
        </p>
        <p>
          Why bother? Slow pages lose search rank and readers. Email clients
          refuse large attachments. Upload forms reject files over a few MB.
          Re-saving at 75–85% JPG quality is the single highest-leverage image
          fix there is. For transparency, use our{" "}
          <a href="/tools/image-format-converter">image format converter</a>{" "}
          instead and save as PNG or WebP.
        </p>
      </>
    ),
    howToUse: [
      "Drop a JPG or PNG into the upload box.",
      "Leave Quality at 75% and Max dim at 2400px — that's the sweet spot.",
      "Click Compress and read the size-saved percentage.",
      "Drop the quality slider if the file still feels big.",
    ],
    useCases: [
      "Shrinking phone photos before uploading to a blog, shop, or social platform.",
      "Getting a website page-weight below the 1MB threshold for good Core Web Vitals.",
      "Compressing images for email attachments where file-size limits apply.",
      "Batch-optimizing product photography before pushing to an e-commerce catalog.",
    ],
    whenToUse: [
      "JPEG or WebP photos where small visual quality loss is acceptable.",
      "Any image over ~500 KB headed for the web.",
      "Re-saving phone photos (10-20 MB originals) for web or email.",
    ],
    whenNotToUse: [
      "Images that need transparency — use the PNG or WebP format converter instead.",
      "Archival or print work where lossless is required.",
      "Already-small images (<100 KB) — the savings will be minimal and quality may suffer.",
    ],
    example: {
      input: "Original: 12 MB JPEG (4032 × 3024)\nQuality: 75%\nMax dim: 2400px",
      output: "Compressed: 480 KB (2400 × 1800)\nSize saved: 96%",
      note: "Visually indistinguishable at normal viewing distances. For hero images on a landing page, this is the target.",
    },
    faq: [
      {
        q: "Does this upload my photos to a server?",
        a: "No. The entire compression runs in your browser using the Canvas API. Your photos never leave your device.",
      },
      {
        q: "What quality setting should I pick?",
        a: "75% is the sweet spot for web photos. 85% for anything where detail matters (product shots, portraits). Below 60% tends to introduce visible artifacts.",
      },
    ],
  },
  "svg-to-png": {
    render: () => <SvgToPng />,
    explainer: (
      <>
        <p>
          A free SVG to PNG rasterizer. Paste SVG source or load a .svg file,
          pick your output resolution, keep transparent background on or off,
          and download a crisp PNG at any size. Perfect for generating favicons,
          app icons, social previews, or print-ready raster versions of logos.
        </p>
        <p>
          SVGs are resolution-independent, but most other tools want pixels.
          This rasterizer lets you export at exactly the size you need — 256×256
          for app icons, 512×512 or 1024×1024 for larger branding, 2048+ for
          print. Uses the browser&rsquo;s built-in SVG renderer so the output
          matches what your SVG actually looks like in Chrome, Safari, and
          Firefox.
        </p>
      </>
    ),
    howToUse: [
      "Paste SVG source or click 'Load file' to drop a .svg.",
      "Set the output width and height, or tap a preset size.",
      "Toggle transparent background depending on where the PNG will land.",
      "Click Convert to PNG, then Download.",
    ],
  },
  "pdf-to-text": {
    render: () => <PdfToText />,
    explainer: (
      <>
        <p>
          A free PDF to text extractor. Drop a PDF and get the plain text out in
          seconds — with optional page markers so you can jump around in the
          output. Runs entirely in your browser using Mozilla&rsquo;s battle-tested
          PDF.js engine, so your document never leaves your device.
        </p>
        <p>
          Useful for pulling quotes out of a report, indexing research papers,
          feeding content into another tool, or just checking what&rsquo;s really
          inside a PDF without opening a heavyweight app. Note: scanned PDFs are
          images of text — you&rsquo;ll need an OCR tool first before this can
          read them.
        </p>
      </>
    ),
    howToUse: [
      "Drop your PDF into the upload box.",
      "Wait a few seconds while the pages stream in.",
      "Toggle Page markers off for continuous text, on to jump by page.",
      "Copy the output or download as a .txt file.",
    ],
  },
  "pdf-to-jpg": {
    render: () => <PdfToJpg />,
    explainer: (
      <>
        <p>
          A free PDF to JPG converter. Every page of your PDF becomes a
          downloadable JPG image, rendered at the resolution you choose. Useful
          for sharing a preview of a document on social media, embedding PDF
          pages in a blog, or digitising a printed report for a gallery-style
          view.
        </p>
        <p>
          All rendering happens locally in your browser — nothing is uploaded.
          The scale slider controls output DPI: 1×≈72 DPI is web-quality,
          2× is crisp for retina displays, 3× is print-ready. Higher scales
          mean bigger files and slower rendering.
        </p>
      </>
    ),
    howToUse: [
      "Drop your PDF.",
      "Pick a scale: 1× for small previews, 2× for screens, 3× for print.",
      "Adjust JPG quality if needed (85–95% is a good range).",
      "Download pages individually — thumbnails render inline.",
    ],
  },
  "jpg-to-pdf": {
    render: () => <JpgToPdf />,
    explainer: (
      <>
        <p>
          A free JPG to PDF builder. Drop multiple JPG, PNG, or WebP images,
          reorder them, pick a paper size, and download one clean PDF. Great
          for turning phone photos of receipts, contracts, or whiteboards into a
          single document you can email or archive.
        </p>
        <p>
          Pick &ldquo;Fit to image&rdquo; when you want each page sized exactly
          to its image (no letterboxing). Pick A4 or Letter when you need a
          standard document to print or email into a pipeline that expects it.
          Everything runs locally — your images never leave the browser.
        </p>
      </>
    ),
    howToUse: [
      "Drop your images into the upload box.",
      "Reorder with the up/down arrows, remove what you don't want.",
      "Pick a paper size and margin.",
      "Click Build PDF, then Download.",
    ],
  },
  "merge-pdf": {
    render: () => <MergePdf />,
    explainer: (
      <>
        <p>
          A free PDF merger that runs entirely in your browser. Drop multiple
          PDFs, reorder them, and download a single combined file. No upload
          limit beyond what your device can hold in memory; no watermarks, no
          account, no wait.
        </p>
        <p>
          Most online PDF mergers upload your files to a server. That&rsquo;s
          fine for a public doc, but risky for bank statements, contracts, or
          medical records. This tool uses the browser-native{" "}
          <a href="https://github.com/Hopding/pdf-lib">pdf-lib</a> library — the
          merge happens entirely on your machine.
        </p>
      </>
    ),
    howToUse: [
      "Drop two or more PDFs.",
      "Use ↑ ↓ to put them in the right order.",
      "Click Merge.",
      "Download the combined PDF with one click.",
    ],
  },
  "heic-to-jpg": {
    render: () => <HeicToJpg />,
    explainer: (
      <>
        <p>
          A free HEIC to JPG converter. Drop one or many HEIC or HEIF files —
          the format iPhones use by default — and get standard JPGs (or PNGs)
          out. Runs offline in your browser; your photos are never uploaded.
          Supports batch conversion so you can clear a whole iCloud export in
          one go.
        </p>
        <p>
          HEIC is smaller and higher-quality than JPG, but many web forms,
          CMSes, and older software refuse it. This tool gets you a compatible
          file without touching iCloud, the Photos app, or a third-party
          uploader. For a single image and more format options, see the{" "}
          <a href="/tools/image-format-converter">image format converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop one or more .heic or .heif files.",
      "Pick JPG (smaller) or PNG (lossless).",
      "Adjust JPG quality if you want to squeeze size.",
      "Click Convert, then download each file.",
    ],
  },
  "ip-lookup": {
    render: () => <IpLookup />,
    explainer: (
      <>
        <p>
          A free, no-sign-up lookup for your public IP address plus the
          approximate location every site you visit can already see. The IP
          comes from{" "}
          <a href="https://www.ipify.org/" target="_blank" rel="noreferrer noopener">
            ipify
          </a>
          ; the city, ISP, and time zone come from{" "}
          <a href="https://ipapi.co/" target="_blank" rel="noreferrer noopener">
            ipapi.co
          </a>
          . Both calls go straight from your browser — nothing is ever
          proxied through us, and no account or API key is required.
        </p>
        <p>
          A few things worth knowing. <strong>Your IP is not your address.</strong>{" "}
          It&rsquo;s assigned by your ISP to a region, and the location you
          see here is usually the nearest major exchange, not your home. If
          you&rsquo;re on a VPN, mobile hotspot, or office network, the
          results reflect <em>that</em> network, not your device. If the geo
          section says unavailable, the free tier&rsquo;s rate limit is the
          usual cause — your IP will still show.
        </p>
      </>
    ),
    howToUse: [
      "Open the page — your IP and approximate location load automatically.",
      "Click Copy to put your IP on the clipboard.",
      "Click Refresh after connecting to a VPN or different network to see the new result.",
      "Compare IPv4 vs IPv6 — if you see IPv6, your ISP has given you a modern address.",
    ],
  },
  "public-holidays": {
    render: () => <PublicHolidays />,
    explainer: (
      <>
        <p>
          A free lookup for public holidays by country and year, powered by{" "}
          <a href="https://date.nager.at/" target="_blank" rel="noreferrer noopener">
            Nager.Date
          </a>
          . Pick a country and year from the dropdowns; you&rsquo;ll see every
          national holiday grouped by month, with the weekday each one falls
          on. Regional observances (U.S. state holidays, German{" "}
          <em>Länder</em>, etc.) are labelled when the source data includes
          them.
        </p>
        <p>
          Useful for a few things: planning PTO around a long weekend, timing
          a product launch so it doesn&rsquo;t land on a closed market,
          scheduling international meetings that actually have both sides
          available, or just checking if next Monday is a bank holiday before
          you call the plumber. For time-zone math the opposite direction,
          see the{" "}
          <a href="/tools/time-zone-converter">time zone converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a country (your region is a good place to start).",
      "Pick the year — past, current, or up to a few years ahead.",
      "Scan the list: dates grouped by month, with the weekday shown.",
      "Today is highlighted if it&rsquo;s a public holiday for that country.",
    ],
  },
  "password-breach-checker": {
    render: () => <PasswordBreachChecker />,
    explainer: (
      <>
        <p>
          A free checker that tells you whether a password has shown up in any
          of the hundreds of credential breaches tracked by{" "}
          <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noreferrer noopener">
            Have I Been Pwned
          </a>
          . If it has, attackers have it — and automated bots will be trying
          it on email, banking, and cloud accounts right now. Change it
          everywhere you&rsquo;ve used it, and make the new one unique per
          site.
        </p>
        <p>
          <strong>You never send the password itself.</strong> The tool hashes
          your password locally with SHA-1, sends only the first 5 hex
          characters to HIBP, and compares the reply against the rest of the
          hash in your browser. This is called{" "}
          <a href="https://en.wikipedia.org/wiki/K-anonymity" target="_blank" rel="noreferrer noopener">
            k-anonymity
          </a>
          . It&rsquo;s the same mechanism 1Password and Chrome&rsquo;s
          password-leak warning rely on. For generating a new password once
          you need to rotate, use the{" "}
          <a href="/tools/password-generator">password generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste a password into the box.",
      "Click Check — it hashes locally and sends only 5 characters of the hash.",
      "A green box means it&rsquo;s not in HIBP&rsquo;s breach corpus; red means rotate it now.",
      "Click Clear when done so the field resets.",
    ],
  },
  // ---------- Wave 5: parity pass ----------
  "pdf-split": {
    render: () => <PdfSplit />,
    explainer: (
      <>
        <p>
          Split a PDF the fast, private way — in your browser. Drop a file, pick
          either &ldquo;every page as its own PDF&rdquo; or a custom range like
          <code> 1-3, 5, 7-9</code>, and each slice becomes its own downloadable
          PDF. Your file never leaves the machine, which matters for contracts,
          medical records, and anything else you&rsquo;d rather not upload.
        </p>
        <p>
          The tool uses{" "}
          <a href="https://pdf-lib.js.org/" target="_blank" rel="noreferrer noopener">pdf-lib</a>, copying pages into new documents so text,
          fonts, and images all stay sharp. If the source is password-protected
          you&rsquo;ll see a clear error — unlock it first, then try again. For
          merging the opposite direction, try{" "}
          <a href="/tools/merge-pdf">Merge PDF</a>; for visual reordering and
          rotation, try <a href="/tools/pdf-organizer">PDF Organizer</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop a PDF onto the upload area.",
      "Choose every-page mode or type a range like 1-3, 5, 7-9.",
      "Click Split — each range becomes its own downloadable PDF.",
      "Download each slice from the list.",
    ],
  },
  "pdf-metadata-viewer": {
    render: () => <PdfMetadataViewer />,
    explainer: (
      <>
        <p>
          Every PDF carries a small block of metadata — title, author, producer,
          creation date, keywords, the software that made it, and sometimes the
          full file path from the creator&rsquo;s machine. This viewer reads it
          all without opening the file in Acrobat, without uploading anywhere,
          and without installing anything. Useful for vetting a contract
          you&rsquo;ve received, auditing a resume before sending, or confirming
          a file matches a version history.
        </p>
        <p>
          If any field surprises you — an author name that&rsquo;s not yours, a
          timestamp from years ago — use{" "}
          <a href="/tools/pdf-metadata-remover">PDF Metadata Remover</a> to
          strip the fields before sharing. For a deeper conceptual walkthrough,
          see <a href="/guides/how-to-remove-pdf-metadata">How to remove PDF metadata</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop any PDF onto the upload area.",
      "Read the two-column metadata table — dashes mean the field is blank.",
      "Note anything surprising (author, producer, creation date, path).",
      "If you need to strip those fields, open PDF Metadata Remover.",
    ],
  },
  "pdf-metadata-remover": {
    render: () => <PdfMetadataRemover />,
    explainer: (
      <>
        <p>
          Strip the author name, title, subject, keywords, creator, producer,
          and timestamp fields from any PDF — all in your browser, nothing
          uploaded. This is the field journalists, lawyers, and job seekers
          reach for: the visible text stays exactly as you wrote it, but the
          hidden fields that leak your username, corporate software suite, or
          original file path are wiped.
        </p>
        <p>
          Caveat: this removes document-level metadata. It does not attempt to
          strip embedded image EXIF or signature traces — those require a
          re-render. For a before/after check, run the output through{" "}
          <a href="/tools/pdf-metadata-viewer">PDF Metadata Viewer</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop the PDF whose metadata you want wiped.",
      "Click Strip metadata — all author/title/creator fields are cleared.",
      "Download the cleaned file.",
      "Re-open it in PDF Metadata Viewer to verify the fields are blank.",
    ],
  },
  "pdf-to-long-image": {
    render: () => <PdfToLongImage />,
    explainer: (
      <>
        <p>
          Stitch every page of a PDF into one tall PNG — perfect for pasting a
          report into a Notion page, previewing a deck in a Slack DM, or
          sharing a signed document where the recipient lives on their phone.
          Rendered with{" "}
          <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noreferrer noopener">PDF.js</a>{" "}
          at a scale you control, so you can trade file size for sharpness.
        </p>
        <p>
          If your PDF is more than a dozen pages, the output can get large —
          the final dimensions are shown next to the download link so you
          can see before you save. For page-by-page images instead of one tall
          strip, use <a href="/tools/pdf-to-jpg">PDF to JPG</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop your PDF onto the upload area.",
      "Pick a render scale — 1.5 is a good default, higher for print.",
      "Click Render — watch the progress indicator.",
      "Download the single tall PNG when it&rsquo;s ready.",
    ],
  },
  "pdf-watermark": {
    render: () => <PdfWatermark />,
    explainer: (
      <>
        <p>
          Stamp a text watermark across every page of a PDF — DRAFT,
          CONFIDENTIAL, your company name, a client reference. You pick the
          text, size, color, opacity, rotation, and one of six positions. The
          watermark is a real PDF layer (not a bitmap overlay), so the
          underlying document stays searchable and selectable.
        </p>
        <p>
          Good watermarks signal status; they don&rsquo;t replace real
          protection. Anyone who wants to can re-OCR and clean it off. For
          shared drafts and work samples the signal is enough — for actual
          confidentiality, limit distribution. For practical guidance on text
          and styling, see{" "}
          <a href="/guides/how-to-add-watermark-to-pdf">How to add a watermark to a PDF</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop the PDF you want to watermark.",
      "Type the watermark text (e.g. DRAFT or your name).",
      "Pick size, color, opacity, rotation, and position.",
      "Click Apply — download the watermarked file.",
    ],
  },
  "pdf-organizer": {
    render: () => <PdfOrganizer />,
    explainer: (
      <>
        <p>
          Reorder, rotate, and delete pages in a PDF using a visual thumbnail
          view. Every page renders as a small preview you can move up or down,
          rotate in 90° steps, or drop from the final document. When
          you&rsquo;re happy with the order, save a new PDF that mirrors it
          exactly. Everything runs in your browser — nothing is uploaded.
        </p>
        <p>
          For pure splitting, <a href="/tools/pdf-split">PDF Split</a> is
          faster. For combining PDFs from multiple files,{" "}
          <a href="/tools/merge-pdf">Merge PDF</a> is the right tool. This
          organizer is for when you already have one file and want to clean up
          its page order — scanning fixes, removing blanks, fixing upside-down
          scans.
        </p>
      </>
    ),
    howToUse: [
      "Drop a PDF — thumbnails load for each page.",
      "Use ↑/↓ to reorder, the rotate button for orientation, ✕ to delete.",
      "Click Save reorganized PDF when the order looks right.",
      "Download your rearranged file.",
    ],
  },
  "pdf-page-numbers": {
    render: () => <PdfPageNumbers />,
    explainer: (
      <>
        <p>
          Add page numbers to any PDF without re-typesetting it in Word or
          InDesign. Pick one of six positions, a font size, a starting number,
          and a format (<code>1, 2, 3</code>, <code>Page 1</code>,{" "}
          <code>Page 1 of N</code>, or <code>1 / N</code>). Skip the first page
          if it&rsquo;s a cover. The numbering is added as a real PDF text
          layer — searchable, not a flattened bitmap.
        </p>
        <p>
          For contracts that cite page numbers in clauses, books that print for
          binding, and multi-page sworn statements, the numbering matters more
          than people assume. More detail and conventions in the guide:{" "}
          <a href="/guides/how-to-add-page-numbers-to-pdf">How to add page numbers to a PDF</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop the PDF you want to number.",
      "Choose position, font size, starting number, and format.",
      "Toggle &ldquo;Skip first page&rdquo; if page 1 is a cover.",
      "Click Apply — download the numbered PDF.",
    ],
  },
  "pdf-crop": {
    render: () => <PdfCrop />,
    explainer: (
      <>
        <p>
          Trim the margins off every page of a PDF at once. Enter how many
          points to shave from the top, right, bottom, and left (72 points = 1
          inch; the default 36 = half an inch). Ideal for cleaning up old scans
          with wide margins, removing the white borders from a slide deck
          exported to PDF, or tightening up a long read for an e-reader.
        </p>
        <p>
          The crop is non-destructive — viewers respect the new crop box but
          the original content stays in the file, so you can always widen the
          box back out later. If you need true page resizing (content actually
          scaled), a desktop PDF editor is a better tool.
        </p>
      </>
    ),
    howToUse: [
      "Drop the PDF you want to crop.",
      "Enter margins in points for top/right/bottom/left (36 = 0.5 inch).",
      "Click Crop all pages — a new PDF saves with the trimmed crop box.",
      "Open it in any PDF viewer — the margins will appear gone.",
    ],
  },
  "webp-to-jpg": {
    render: () => <WebpToJpg />,
    explainer: (
      <>
        <p>
          WebP is great for the web (smaller files, same visual quality) but
          shows up as broken in older CMSs, most print-shop upload forms,
          iMessage photo previews, and some email clients. This converter
          batches multiple WebP images to JPG in one click — canvas-based,
          quality-adjustable, and everything runs in your browser.
        </p>
        <p>
          Transparency gets flattened onto white when saving JPG (JPG
          doesn&rsquo;t support alpha). If your WebP has transparency you want
          to preserve, use{" "}
          <a href="/tools/image-format-converter">Image Format Converter</a>{" "}
          and output PNG instead.
        </p>
      </>
    ),
    howToUse: [
      "Drop one or many .webp files onto the upload area.",
      "Adjust the quality slider (0.92 is a safe default).",
      "Click Convert all — each file gets a JPG version below.",
      "Download them individually from the list.",
    ],
  },
  "image-cropper": {
    render: () => <ImageCropper />,
    explainer: (
      <>
        <p>
          Crop an image to a custom box or a fixed aspect ratio — square for
          profile photos, 4:5 for portrait posts, 16:9 for YouTube, 9:16 for
          Stories and Reels. Drag the crop rectangle or resize from its
          corners; the side panel shows the exact region you&rsquo;ll export.
          Output preserves the original resolution of the cropped area, so no
          blur or rescale is introduced.
        </p>
        <p>
          For resizing the whole image instead of cropping, use{" "}
          <a href="/tools/image-resizer">Image Resizer</a>. For shrinking file
          size after cropping, <a href="/tools/image-compressor">Image Compressor</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop an image onto the upload area.",
      "Pick a fixed aspect ratio, or leave it free.",
      "Drag the crop box or its corner handles to frame the shot.",
      "Click Export cropped — download the PNG.",
    ],
  },
  "color-extractor": {
    render: () => <ColorExtractor />,
    explainer: (
      <>
        <p>
          Upload any image and get back the six most-dominant colors as HEX,
          RGB, and HSL — with a one-click copy on each. The picker samples the
          image onto a small canvas, buckets each pixel into a 32-step RGB
          grid, and surfaces the most-populated buckets. Useful for building a
          mood board, matching a site&rsquo;s brand color to its hero photo,
          or checking logo contrast.
        </p>
        <p>
          For converting one color between formats (HEX ↔ RGB ↔ HSL), see{" "}
          <a href="/tools/color-converter">Color Converter</a>. For manual
          tweaks from a starting palette, the HSL output makes it easy to
          shift hue or saturation by a fixed amount.
        </p>
      </>
    ),
    howToUse: [
      "Drop an image — the swatch panel updates automatically.",
      "Copy HEX, RGB, or HSL from any swatch.",
      "If the palette feels off, try a different crop or a higher-contrast shot.",
      "Drop a new image to reset.",
    ],
  },
  "gif-maker": {
    render: () => <GifMaker />,
    explainer: (
      <>
        <p>
          Build a looping GIF from a stack of images — PNGs from a tutorial,
          a burst of photos from your phone, frames exported from a video.
          Set frame delay (80-200ms is common), output width, and whether it
          should loop. The encoder runs entirely in your browser using{" "}
          <a href="https://github.com/jnordberg/gif.js" target="_blank" rel="noreferrer noopener">gif.js</a> —
          no uploads, no watermark.
        </p>
        <p>
          For anything over ~8 seconds or with lots of detail, an MP4 will be
          smaller and smoother; use a video tool for that. GIF shines for
          email, Slack previews, and short no-audio tutorials where a link
          preview won&rsquo;t autoplay an MP4.
        </p>
      </>
    ),
    howToUse: [
      "Drop multiple image frames onto the upload area.",
      "Reorder with ↑/↓ to get the right sequence.",
      "Set delay (ms/frame), width, and loop.",
      "Click Create GIF — download when rendering finishes.",
    ],
  },
  "qr-code-generator": {
    render: () => <QrCodeGenerator />,
    explainer: (
      <>
        <p>
          Generate a QR code for any URL, wifi string, or plain text — free,
          offline, no account. Pick size, error-correction level (L/M/Q/H —
          higher survives smudges and crops at the cost of density), and
          colors. Download as PNG for print and social, or SVG for infinite
          scaling.
        </p>
        <p>
          Rules of thumb: keep the data short (shortened URL beats long
          query-string link), use error-correction M for most cases and Q
          when a logo overlay or glossy surface is in play, and test from
          two or three phones before printing — the cheapest phone is usually
          the strictest scanner. More tips in{" "}
          <a href="/guides/how-to-generate-qr-codes">How to generate QR codes</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste the text or URL to encode.",
      "Pick size, error-correction level, and colors.",
      "Preview updates live.",
      "Download as PNG (for print/social) or SVG (for perfect scaling).",
    ],
  },
  "age-gap-calculator": {
    render: () => <AgeGapCalculator />,
    explainer: (
      <>
        <p>
          Enter two birthdays and see the gap in years, months, and days —
          calendar-correct, not a rough &ldquo;subtract the years&rdquo;
          approximation. Borrows days from the previous month when the
          subtraction goes negative, so a Feb 28 to Mar 1 gap reads as 1 day,
          not a month. Works for couples, siblings, sports eligibility, or any
          two humans.
        </p>
        <p>
          For a single person&rsquo;s age today, use{" "}
          <a href="/tools/age-calculator">Age Calculator</a>. For the math
          behind the calendar borrowing rules, see{" "}
          <a href="/guides/how-to-calculate-age-gap">How to calculate an age gap</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick Person 1&rsquo;s birthday.",
      "Pick Person 2&rsquo;s birthday.",
      "Read the gap in years, months, days — plus total days.",
      "Order doesn&rsquo;t matter; the tool uses the absolute gap.",
    ],
  },
  "percentage-calculator": {
    render: () => <PercentageCalculator />,
    explainer: (
      <>
        <p>
          A fast percentage calculator that covers the three formulas that
          actually come up in daily life: &ldquo;what is X% of Y&rdquo;,
          &ldquo;A is what percent of B&rdquo;, and &ldquo;percent change from
          old to new&rdquo;. All three are live on the page — fill the one you
          need. Negative results show red so a price drop or account loss
          reads at a glance.
        </p>
        <p>
          For tip and bill-split math specifically, use the{" "}
          <a href="/tools/tip-calculator">Tip Calculator</a>. For a written
          walkthrough of five common formulas, including markup and reverse
          percent, see{" "}
          <a href="/guides/how-to-calculate-percentages">How to calculate percentages</a>.
        </p>
      </>
    ),
    howToUse: [
      "Use the first card for &ldquo;what is X% of Y&rdquo; — enter two numbers.",
      "Use the second for &ldquo;A is what % of B&rdquo;.",
      "Use the third for percent change — negative means a drop.",
      "Numbers update as you type; nothing to submit.",
    ],
  },
  "hash-generator": {
    render: () => <HashGenerator />,
    explainer: (
      <>
        <p>
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text — all
          four at once, computed locally, nothing sent anywhere. Useful for
          verifying a file-integrity checksum, building a fingerprint for
          deduplication, or testing a hashing pipeline during development.
        </p>
        <p>
          One thing worth being clear about: <strong>do not use MD5 or SHA-1
          for storing passwords.</strong> Both are broken for that purpose —
          too fast, well-rainbowed, and missing a salt. For password storage
          use a proper password-hashing function (bcrypt, scrypt, Argon2). See{" "}
          <a href="/guides/how-to-hash-passwords">How to hash passwords</a> for
          the full explanation, and{" "}
          <a href="/tools/password-breach-checker">Password Breach Checker</a>{" "}
          if you want to check whether your password has leaked.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste your input into the textarea.",
      "All four hashes update as you type.",
      "Use the Copy button next to any hash.",
      "Clear the input when done — nothing is remembered.",
    ],
  },
  "css-minifier": {
    render: () => <CssMinifier />,
    explainer: (
      <>
        <p>
          Paste a stylesheet, click Minify, get a smaller version with comments
          and whitespace stripped. The result is ready to paste into a{" "}
          <code>&lt;style&gt;</code> block, copy into a production build
          shortcut, or compare against your build tool&rsquo;s output. Runs in
          your browser — your CSS never leaves the page.
        </p>
        <p>
          This is a string-level minifier — it preserves quoted content but
          doesn&rsquo;t understand CSS grammar. For a full-optimization
          pipeline (including color shortening, rule merging, and dead-code
          removal) a build tool like cssnano or lightningcss is still the
          right answer.
        </p>
      </>
    ),
    howToUse: [
      "Paste your CSS into the input textarea.",
      "Click Minify — the output and savings appear below.",
      "Copy the result with the Copy button.",
      "Click Clear to reset.",
    ],
  },
  "js-minifier": {
    render: () => <JsMinifier />,
    explainer: (
      <>
        <p>
          Paste some JavaScript, click Minify, get a smaller version — strips
          line and block comments, collapses whitespace, and tightens spaces
          around punctuation. Useful for trimming a snippet before pasting
          into an inline script tag or a config file. No code ever leaves
          your browser.
        </p>
        <p>
          <strong>Caveat:</strong> this is a conservative regex-based
          minifier. It preserves quoted strings and template literals but
          won&rsquo;t re-rename variables, shorten booleans, or fully parse
          regex literals. For production builds, use{" "}
          <a href="https://terser.org/" target="_blank" rel="noreferrer noopener">Terser</a>{" "}
          — every modern bundler wraps it.
        </p>
      </>
    ),
    howToUse: [
      "Paste your JavaScript into the textarea.",
      "Click Minify — output and saved bytes show below.",
      "Copy the minified version.",
      "For heavy regex-based code, verify the result still runs.",
    ],
  },
  "xml-formatter": {
    render: () => <XmlFormatter />,
    explainer: (
      <>
        <p>
          Paste XML, click Format, and get a cleanly indented, 2-space output
          that&rsquo;s easy to read and diff. Invalid XML surfaces the parser
          error inline — much faster than opening an IDE. Minify mode strips
          whitespace between tags when you need the smallest possible payload.
        </p>
        <p>
          All parsing uses the browser&rsquo;s built-in{" "}
          <code>DOMParser</code>, so it runs without dependencies and handles
          namespaces, CDATA, comments, and self-closing tags correctly. For
          JSON, use <a href="/tools/json-formatter">JSON Formatter</a>; for
          YAML↔JSON conversions,{" "}
          <a href="/tools/yaml-json-converter">YAML ↔ JSON</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste XML into the input.",
      "Click Format for indented output, or Minify for a compact version.",
      "Read the error message if the parser flags a problem.",
      "Copy the output when it looks right.",
    ],
  },
  "diff-checker": {
    render: () => <DiffChecker />,
    explainer: (
      <>
        <p>
          Paste two blocks of text — a previous and current version of a
          contract, a commit message, or a draft — and see exactly which lines
          changed. Unchanged lines appear grey on both sides; removed lines
          are red on the left, added lines are green on the right. The diff
          is a standard LCS-based line comparison, same idea as{" "}
          <code>diff</code> on a Unix shell.
        </p>
        <p>
          For comparing structured text like JSON, reformat both sides first
          with <a href="/tools/json-formatter">JSON Formatter</a> before
          running the diff — identical data can otherwise show as completely
          different if whitespace or key order shifted.
        </p>
      </>
    ),
    howToUse: [
      "Paste the original text on the left.",
      "Paste the changed text on the right.",
      "Click Compare — scroll through the side-by-side result.",
      "Red = removed, green = added, grey = unchanged.",
    ],
  },
  // Wave 6 — full library completion (40 tools)
  "tax-calculator": {
    render: () => <TaxCalculator />,
    explainer: (
      <>
        <p>
          Estimate your federal income tax in seconds using 2024 US tax brackets for single, married-filing-jointly,
          and head-of-household filers. Add a state tax rate to see your total tax burden, effective tax rate, and
          take-home income — all calculated in your browser with no data leaving your device.
        </p>
        <p>
          This is a simplified calculator suited for planning and quick estimates, not for filing. It applies
          progressive federal brackets to your gross income and a flat state rate, ignoring deductions, credits,
          FICA, and itemized situations. For paycheck-level breakdowns use the{" "}
          <a href="/tools/paycheck-calculator">paycheck calculator</a>; for retirement planning, see{" "}
          <a href="/tools/compound-interest-calculator">compound interest</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your gross annual income.",
      "Pick your filing status (single, married, or head of household).",
      "Add an optional state tax rate if you want a combined estimate.",
      "Review your federal tax, state tax, and take-home pay.",
    ],
  },
  "vat-calculator": {
    render: () => <VatCalculator />,
    explainer: (
      <>
        <p>
          Add or remove VAT/GST from any price instantly. Enter the amount and rate, then pick whether VAT should be
          added on top of the price (going from net to gross) or extracted from a VAT-inclusive price (going from
          gross to net). The calculator shows the net amount, VAT portion, and gross total side by side.
        </p>
        <p>
          Useful for invoicing, expense reports, cross-border purchases, or quickly checking the VAT on a receipt.
          Works for any rate — UK 20%, Ireland 23%, Germany 19%, Australia GST 10%, etc. For US sales tax use{" "}
          <a href="/tools/tax-calculator">tax calculator</a>; for discount math see{" "}
          <a href="/tools/discount-calculator">discount calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount.",
      "Set the VAT/GST rate as a percentage.",
      "Choose add VAT (net → gross) or remove VAT (gross → net).",
      "Read the net, VAT, and gross values in the result card.",
    ],
  },
  "discount-calculator": {
    render: () => <DiscountCalculator />,
    explainer: (
      <>
        <p>
          Work out the exact savings on any sale price in seconds. Forward mode takes an original price and a
          discount percent and shows the final price plus how much you save. Reverse mode takes an original and a
          sale price and tells you the effective discount percent — handy for comparing ambiguous promos.
        </p>
        <p>
          All math runs locally, with no tracking. Pair with{" "}
          <a href="/tools/tax-calculator">tax calculator</a> to add sales tax to a discounted price, or{" "}
          <a href="/tools/profit-margin-calculator">margin calculator</a> when you&apos;re setting the discount
          yourself as a seller.
        </p>
      </>
    ),
    howToUse: [
      "Enter the original price.",
      "Enter the discount percent (or pick reverse mode).",
      "Read the final price and total savings.",
      "In reverse mode, input the sale price to learn the real discount rate.",
    ],
  },
  "profit-margin-calculator": {
    render: () => <ProfitMarginCalculator />,
    explainer: (
      <>
        <p>
          Calculate profit margin, markup, and gross profit from cost and revenue — or reverse it: input a cost and
          desired margin, and the tool computes the price you need to charge. Margin is profit as a percent of
          revenue; markup is profit as a percent of cost. Mixing them up is the number-one pricing mistake, so the
          tool shows both.
        </p>
        <p>
          Every computation runs in your browser. Useful for pricing products, evaluating deals, or stress-testing a
          quote. Follow up with <a href="/tools/break-even-calculator">break-even calculator</a> to see how many
          units you need to sell, or <a href="/tools/roi-calculator">ROI calculator</a> for investment returns.
        </p>
      </>
    ),
    howToUse: [
      "Enter the unit cost.",
      "Enter the selling price (or flip to reverse mode).",
      "In reverse mode, enter a target margin — the tool returns the required price.",
      "Read profit, margin %, and markup % side by side.",
    ],
  },
  "net-worth-calculator": {
    render: () => <NetWorthCalculator />,
    explainer: (
      <>
        <p>
          Track everything you own against everything you owe with a clean two-column worksheet. Add as many asset
          rows (cash, investments, home, vehicles, crypto) and liability rows (mortgage, credit cards, student
          loans) as you need. The calculator sums each column and shows your net worth in real time — everything
          stays in your browser.
        </p>
        <p>
          Net worth is the single number that actually measures financial progress. Recompute monthly or quarterly
          to see the trend. Pair with <a href="/tools/budget-calculator">budget calculator</a> to find cash-flow
          leaks, or <a href="/tools/debt-payoff-calculator">debt payoff</a> to accelerate the liabilities side.
        </p>
      </>
    ),
    howToUse: [
      "Add asset rows — label each and enter a current value.",
      "Add liability rows — mortgage, credit cards, loans.",
      "Remove any row with the trash icon.",
      "Your net worth updates instantly at the bottom.",
    ],
  },
  "inflation-calculator": {
    render: () => <InflationCalculator />,
    explainer: (
      <>
        <p>
          Adjust historical US dollar amounts for inflation between 1914 and today using CPI-based approximations.
          Enter an amount, a start year, and an end year — the calculator shows what that money would be worth in
          today&apos;s terms (or any other year), plus the total and annualized inflation rate for the period.
        </p>
        <p>
          Values are linearly interpolated between anchor years, so results are estimates, not official BLS figures.
          Still, it&apos;s close enough for context: salary comparisons across decades, property value trends, or
          thinking about long-term savings goals. See also{" "}
          <a href="/tools/compound-interest-calculator">compound interest</a> for the flip side — how investments
          can outpace inflation over time.
        </p>
      </>
    ),
    howToUse: [
      "Enter the original dollar amount.",
      "Pick the start year (year of the original amount).",
      "Pick the end year (what year to translate it into).",
      "Review the equivalent value, total inflation, and annualized rate.",
    ],
  },
  "break-even-calculator": {
    render: () => <BreakEvenCalculator />,
    explainer: (
      <>
        <p>
          Know the exact sales volume where your business stops losing money and starts making a profit. Enter your
          fixed costs (rent, salaries, subscriptions), variable cost per unit, and selling price per unit. The tool
          computes the break-even point in units sold and revenue needed, plus your contribution margin per unit.
        </p>
        <p>
          Add an expected sales figure and you&apos;ll also see your margin of safety — how far sales can drop
          before you hit a loss. Every calculation runs locally. Pair with{" "}
          <a href="/tools/profit-margin-calculator">profit margin</a> when experimenting with prices, or{" "}
          <a href="/tools/roi-calculator">ROI calculator</a> for long-horizon investment math.
        </p>
      </>
    ),
    howToUse: [
      "Enter total fixed costs per period.",
      "Enter variable cost per unit.",
      "Enter selling price per unit.",
      "Optionally add expected sales to see your margin of safety.",
    ],
  },
  "bmr-calculator": {
    render: () => <BmrCalculator />,
    explainer: (
      <>
        <p>
          Calculate your Basal Metabolic Rate — the calories you burn at complete rest — using the Mifflin-St Jeor
          equation, the current standard used by dietitians. Enter age, sex, weight, and height, then pick an
          activity level to see your Total Daily Energy Expenditure (TDEE): the calories you need to maintain your
          current weight with normal activity.
        </p>
        <p>
          Use BMR as a baseline and TDEE as the number to eat for maintenance; subtract 500/day for roughly a pound
          of loss per week, add 250/day for lean gains. Compare with{" "}
          <a href="/tools/calorie-calculator">calorie calculator</a> for goal-based targets, or{" "}
          <a href="/tools/macro-calculator">macro calculator</a> to split TDEE into protein, carbs, and fat.
        </p>
      </>
    ),
    howToUse: [
      "Enter age, sex, weight, and height (metric or imperial).",
      "Pick the activity level that matches your week.",
      "Read your BMR (resting) and TDEE (daily need).",
      "Adjust intake relative to TDEE based on your goal.",
    ],
  },
  "body-fat-calculator": {
    render: () => <BodyFatCalculator />,
    explainer: (
      <>
        <p>
          Estimate body fat percentage using the US Navy method — the easiest reliable calculation that only needs a
          tape measure. Enter sex, height, neck and waist circumference (and hip for women), and the tool returns
          your body fat % plus a category (essential, athletic, fit, average, or high) using ACE-published ranges.
        </p>
        <p>
          Results are accurate to within a few percent for most people and much cheaper than a DEXA or BodPod scan.
          Measure in the morning, relaxed, and use the same tape position every time for good trend data. See{" "}
          <a href="/tools/bmi-calculator">BMI calculator</a> for a simpler height/weight metric or{" "}
          <a href="/tools/ideal-weight-calculator">ideal weight</a> for target weight math.
        </p>
      </>
    ),
    howToUse: [
      "Measure your neck, waist (and hip if female) with a flexible tape.",
      "Enter sex and height.",
      "Input each circumference in cm or inches.",
      "Read your body fat % and category.",
    ],
  },
  "pregnancy-calculator": {
    render: () => <PregnancyCalculator />,
    explainer: (
      <>
        <p>
          Estimate your due date, current week of pregnancy, and trimester from either the first day of your last
          menstrual period (LMP) or a known conception date. Uses the standard Naegele&apos;s rule of LMP + 280
          days, the same formula most practitioners and apps use for a first-look estimate.
        </p>
        <p>
          This is a planning tool, not a medical device — real due dates shift based on ultrasound dating,
          ovulation timing, and individual cycle variation. For fertility-window planning before conception, use the{" "}
          <a href="/tools/ovulation-calculator">ovulation calculator</a>; for ongoing appointments and milestones,
          keep it beside your prenatal-care schedule.
        </p>
      </>
    ),
    howToUse: [
      "Pick LMP or conception-date mode.",
      "Enter the relevant date.",
      "Read your estimated due date and current pregnancy week.",
      "See which trimester you&apos;re in and the estimated conception date.",
    ],
  },
  "ovulation-calculator": {
    render: () => <OvulationCalculator />,
    explainer: (
      <>
        <p>
          Find your most fertile days from the date of your last period and your average cycle length. The tool
          estimates ovulation (around 14 days before your next period), the six-day fertile window leading up to
          it, and the predicted start of your next three cycles — useful whether you&apos;re trying to conceive or
          planning around your cycle.
        </p>
        <p>
          This is a rhythm-based estimate; real ovulation varies by a few days from cycle to cycle. For higher
          accuracy combine with basal body temperature tracking or ovulation test strips. If you&apos;ve already
          conceived, switch over to <a href="/tools/pregnancy-calculator">pregnancy calculator</a> for due-date and
          week math.
        </p>
      </>
    ),
    howToUse: [
      "Enter the first day of your last period.",
      "Enter your average cycle length (default 28 days).",
      "Review your predicted ovulation day and fertile window.",
      "Plan around the next three predicted cycles shown below.",
    ],
  },
  "steps-to-calories-calculator": {
    render: () => <StepsToCaloriesCalculator />,
    explainer: (
      <>
        <p>
          Convert step count to calories burned using your weight and walking pace. Enter steps, weight, and pick
          slow, moderate, or brisk — the calculator returns calories, approximate distance in miles and kilometers,
          and walking time at that pace. Useful for daily-step goals, fitness challenges, and training logs.
        </p>
        <p>
          Numbers are estimates based on standard MET values; actual calorie burn varies with terrain, stride
          length, and fitness level. Pair with <a href="/tools/running-pace-calculator">running pace</a> for run
          training or <a href="/tools/calorie-calculator">calorie calculator</a> to set a daily target.
        </p>
      </>
    ),
    howToUse: [
      "Enter step count.",
      "Enter body weight (kg or lb).",
      "Pick pace: slow, moderate, or brisk.",
      "Read calories burned, distance, and walking time.",
    ],
  },
  "weight-converter": {
    render: () => <WeightConverter />,
    explainer: (
      <>
        <p>
          Convert between milligrams, grams, kilograms, ounces, pounds, stones, and metric tons instantly. Pick
          your source and target units, type a number, and see the result plus a full conversion table showing
          the value in every supported unit — handy when you need more than one answer.
        </p>
        <p>
          Accurate to the exact international avoirdupois pound (453.59237 g) and metric definitions. For other
          physical units see <a href="/tools/length-converter">length</a>,{" "}
          <a href="/tools/volume-converter">volume</a>, or{" "}
          <a href="/tools/temperature-converter">temperature</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick source and target units.",
      "Enter the value.",
      "Read the conversion — or see every unit in the table below.",
      "Use the swap button to flip source and target.",
    ],
  },
  "time-converter": {
    render: () => <TimeConverter />,
    explainer: (
      <>
        <p>
          Translate between milliseconds, seconds, minutes, hours, days, weeks, months, and years. Uses 30.44 days
          per month and 365.25 days per year (the Gregorian calendar average), so long-span conversions stay
          accurate. Enter a value, pick your units, and see every other unit computed instantly in the table below.
        </p>
        <p>
          Handy for estimating cooking times, project durations, server uptimes, and back-of-envelope planning. For
          specific date arithmetic use <a href="/tools/date-difference-calculator">date difference</a>; for time-of-
          day math, <a href="/tools/time-duration-calculator">time duration</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter a duration.",
      "Pick source and target units.",
      "Read the result and check the full conversion table for every unit.",
      "Swap source/target with the swap button.",
    ],
  },
  "area-converter": {
    render: () => <AreaConverter />,
    explainer: (
      <>
        <p>
          Convert square millimeters, centimeters, meters, hectares, square kilometers, square inches, feet,
          yards, acres, and square miles. Useful for real-estate listings, agriculture, construction plans, and
          schoolwork. Every base conversion uses precise definitions (1 acre = 4046.8564224 m², 1 ha = 10,000 m²).
        </p>
        <p>
          See also <a href="/tools/length-converter">length</a> for linear measurements,{" "}
          <a href="/tools/volume-converter">volume</a> for three-dimensional math, and{" "}
          <a href="/tools/unit-converter">unit converter</a> for mixed-category conversions.
        </p>
      </>
    ),
    howToUse: [
      "Pick the source unit (what you have).",
      "Pick the target unit (what you want).",
      "Enter the value.",
      "Read the conversion and the full per-unit table below.",
    ],
  },
  "volume-converter": {
    render: () => <VolumeConverter />,
    explainer: (
      <>
        <p>
          Convert between milliliters, liters, cubic meters, US cooking units (tsp, tbsp, fl oz, cup, pint, quart,
          gallon), and cubic inches/feet. Values stored internally in liters for precision, using the exact US
          customary definitions (1 gal = 3.785411784 L, 1 fl oz = 29.5735296 mL).
        </p>
        <p>
          Useful for recipes, fuel calculations, aquariums, and chemistry. Note that US and UK fluid units differ —
          this tool uses US definitions. For mass see <a href="/tools/weight-converter">weight converter</a>;
          for surface area, <a href="/tools/area-converter">area converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Choose source and target volume units.",
      "Enter the value.",
      "Review the direct conversion and the full unit table.",
      "Swap units with the swap button.",
    ],
  },
  "data-size-converter": {
    render: () => <DataSizeConverter />,
    explainer: (
      <>
        <p>
          Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. Toggle between
          decimal (1000-based: KB, MB, GB) and binary (1024-based: KiB, MiB, GiB) modes — decimal is what
          storage vendors advertise, binary is what operating systems report, and the difference gets big at
          higher scales.
        </p>
        <p>
          Handy for disk-space planning, bandwidth estimates, and understanding why your 1 TB drive shows as 931
          GB. See also <a href="/tools/number-base-converter">number base converter</a> for binary/hex math and{" "}
          <a href="/tools/unit-converter">unit converter</a> for general unit work.
        </p>
      </>
    ),
    howToUse: [
      "Pick decimal (1000) or binary (1024) mode.",
      "Choose source and target units.",
      "Enter a value.",
      "Read the conversion and see every unit in the table below.",
    ],
  },
  "energy-converter": {
    render: () => <EnergyConverter />,
    explainer: (
      <>
        <p>
          Convert joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU, electronvolts, and
          foot-pounds. Useful in physics homework, food labels (kcal ↔ kJ), HVAC (BTU ↔ kWh), utility bills, and
          engineering. All conversions use SI exact relationships (1 cal = 4.184 J, 1 kWh = 3.6 MJ, 1 BTU =
          1055.06 J).
        </p>
        <p>
          For power see <a href="/tools/unit-converter">unit converter</a>; for weight-related nutrition,{" "}
          <a href="/tools/calorie-calculator">calorie calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Select source and target energy units.",
      "Enter the numeric value.",
      "Read the direct conversion plus the per-unit table.",
      "Swap source and target with the swap button.",
    ],
  },
  "fraction-calculator": {
    render: () => <FractionCalculator />,
    explainer: (
      <>
        <p>
          Add, subtract, multiply, and divide two fractions. Enter numerators and denominators, pick an operation,
          and the calculator returns the result as a reduced fraction, a mixed number, and a decimal. All math
          runs in the browser using GCD-based reduction, so results are exact rational numbers, not floating-point
          approximations.
        </p>
        <p>
          Great for cooking (half of ¾ cup), carpentry (feet-and-inches math), probability puzzles, and homework.
          For decimal-to-percent conversions see <a href="/tools/percentage-calculator">percentage calculator</a>;
          for proportions use the <a href="/tools/ratio-calculator">ratio calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the first fraction (numerator over denominator).",
      "Pick +, −, ×, or ÷.",
      "Enter the second fraction.",
      "Read the reduced answer, mixed number, and decimal equivalent.",
    ],
  },
  "average-calculator": {
    render: () => <AverageCalculator />,
    explainer: (
      <>
        <p>
          Paste or type any list of numbers (comma, space, or newline separated) to compute count, sum, mean,
          median, mode, minimum, maximum, range, and both population and sample variance and standard deviation.
          One textarea, full stat summary — no spreadsheet required.
        </p>
        <p>
          Useful for quick data checks, survey results, lab measurements, and sports stats. For percentage math see{" "}
          <a href="/tools/percentage-calculator">percentage calculator</a>; for scaling proportions,{" "}
          <a href="/tools/ratio-calculator">ratio calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste your numbers into the textarea — comma, space, or newline separated.",
      "Read mean, median, mode, and range at the top.",
      "Scroll down for variance and standard deviation (population and sample).",
      "Clear and paste a new dataset anytime.",
    ],
  },
  "date-difference-calculator": {
    render: () => <DateDifferenceCalculator />,
    explainer: (
      <>
        <p>
          Measure the gap between any two dates. Enter a start and end date and the calculator returns the
          difference in years/months/days, plus the total in days, weeks, hours, and minutes. It also breaks down
          how many Mondays, Tuesdays, etc. fell inside the range.
        </p>
        <p>
          Useful for counting days until a deadline, tracking anniversaries, tallying vacation days, or checking
          gaps in employment history. For duration between two clock times see{" "}
          <a href="/tools/time-duration-calculator">time duration calculator</a>; for age-specific math,{" "}
          <a href="/tools/age-calculator">age calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a start date.",
      "Pick an end date.",
      "Read the human-friendly duration at the top.",
      "Scroll down for weekday breakdown and total hours/minutes.",
    ],
  },
  "time-duration-calculator": {
    render: () => <TimeDurationCalculator />,
    explainer: (
      <>
        <p>
          Calculate the duration between two clock times, or add/subtract a duration from a starting time. Handles
          overnight spans (22:00 → 06:00 = 8 hours) and shows the answer in hours, minutes, total minutes, and
          decimal hours — the format payroll systems expect.
        </p>
        <p>
          Useful for timesheets, work shifts, and travel planning. For calendar-date differences see{" "}
          <a href="/tools/date-difference-calculator">date difference calculator</a>; for time zones, use{" "}
          <a href="/tools/time-zone-converter">time zone converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick duration mode or add/subtract mode.",
      "Enter start and end times (or a start time and a duration).",
      "Toggle overnight if the end is the next day.",
      "Read hours, minutes, decimal hours.",
    ],
  },
  "prime-number-checker": {
    render: () => <PrimeNumberChecker />,
    explainer: (
      <>
        <p>
          Check whether a number is prime, and if not, see its full prime factorization. Enter any integer up to
          about a trillion (1e12) and the tool returns yes/no, the prime factorization in exponent notation
          (60 = 2² × 3 × 5), a list of divisors, and the next and previous prime numbers.
        </p>
        <p>
          Uses 6k±1 trial division — practical for numbers up to ~10¹². For much larger inputs you&apos;d want
          Miller-Rabin; this tool targets education and quick math. See also{" "}
          <a href="/tools/number-base-converter">number base converter</a> for binary/hex representations and{" "}
          <a href="/tools/fraction-calculator">fraction calculator</a> for GCD-heavy math.
        </p>
      </>
    ),
    howToUse: [
      "Enter any integer up to 1e12.",
      "See the prime/composite verdict and factorization.",
      "Scroll the divisor list and the next/previous primes.",
      "Try another number anytime.",
    ],
  },
  "ratio-calculator": {
    render: () => <RatioCalculator />,
    explainer: (
      <>
        <p>
          Simplify a ratio (e.g., 18:24 → 3:4) or solve a proportion where one value is unknown (3:4 = x:12 →
          x=9). Both modes use GCD-based reduction and exact rational math, so there are no floating-point
          surprises. Decimals are scaled to integers before reduction.
        </p>
        <p>
          Useful for recipes, blueprint scaling, aspect ratios, and mixing concentrations. Pair with{" "}
          <a href="/tools/fraction-calculator">fraction calculator</a> for arithmetic on reduced fractions, or{" "}
          <a href="/tools/percentage-calculator">percentage calculator</a> when you need the ratio as a percent.
        </p>
      </>
    ),
    howToUse: [
      "Pick simplify or solve-proportion mode.",
      "Enter the ratio values; leave one blank in solve mode.",
      "Read the simplified ratio or the solved value.",
      "Check the decimal and percentage equivalents shown below.",
    ],
  },
  "jwt-decoder": {
    render: () => <JwtDecoder />,
    explainer: (
      <>
        <p>
          Paste a JSON Web Token (JWT) to decode its header and payload locally in your browser. The tool reveals
          the algorithm, issuer, expiry, and any custom claims — and shows a human-readable version of exp and
          iat timestamps (&ldquo;expires in 2h 14m&rdquo; / &ldquo;expired 3d ago&rdquo;).
        </p>
        <p>
          <strong>No signature verification</strong> — that requires the signing key and is done server-side in
          production code. Use this for quick debugging, never for authentication. Tokens never leave your
          browser. See <a href="/tools/base64-encoder-decoder">Base64 encoder</a> for raw base64url work or{" "}
          <a href="/tools/hash-generator">hash generator</a> for signing material.
        </p>
      </>
    ),
    howToUse: [
      "Paste the JWT (three base64url segments separated by dots).",
      "Review the decoded header and payload.",
      "Check the human-readable expiry and issued-at times.",
      "Copy individual sections with the copy buttons.",
    ],
  },
  "html-formatter": {
    render: () => <HtmlFormatter />,
    explainer: (
      <>
        <p>
          Beautify messy HTML into clean, 2-space indented markup, or minify it by stripping whitespace between
          tags. The formatter walks the token stream, handles void tags and self-closing elements, and preserves
          text content. Minify mode produces the smallest HTML possible while keeping the structure valid.
        </p>
        <p>
          Great for cleaning up scraped markup, email templates, or dumping production HTML for inspection. For
          CSS/JS compression see <a href="/tools/css-minifier">CSS minifier</a> and{" "}
          <a href="/tools/js-minifier">JS minifier</a>; for JSON work,{" "}
          <a href="/tools/json-formatter">JSON formatter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste HTML into the input.",
      "Pick beautify or minify.",
      "Read the formatted output.",
      "Copy or download the result.",
    ],
  },
  "sql-formatter": {
    render: () => <SqlFormatter />,
    explainer: (
      <>
        <p>
          Format raw SQL into readable, keyword-uppercased, newline-per-clause form — SELECT, FROM, WHERE, JOIN,
          GROUP BY, ORDER BY each on their own line. Or flip to minify and collapse back to a single line for
          pasting into code. Works with most dialects (Postgres, MySQL, SQL Server, SQLite).
        </p>
        <p>
          Useful for code review, debugging slow queries, and sanity-checking long JOINs. Pair with{" "}
          <a href="/tools/json-formatter">JSON formatter</a> and{" "}
          <a href="/tools/regex-tester">regex tester</a> in your day-to-day dev toolkit.
        </p>
      </>
    ),
    howToUse: [
      "Paste your SQL query.",
      "Click Format (or Minify for the single-line version).",
      "Copy the result back into your code.",
      "Uppercased keywords make diffs easier to read.",
    ],
  },
  "password-strength-checker": {
    render: () => <PasswordStrengthChecker />,
    explainer: (
      <>
        <p>
          Check how strong a password is with a live score (0 – 4), a color bar, entropy bits, and an estimated
          time-to-crack at 10 billion guesses per second. A checklist flags missing criteria (length ≥ 12,
          uppercase, lowercase, digits, symbols, no common patterns). The tool also warns on common passwords
          like &ldquo;password&rdquo; or &ldquo;123456&rdquo;.
        </p>
        <p>
          <strong>Nothing ever leaves your browser</strong> — no network calls, no logging. For generating strong
          passwords use <a href="/tools/password-generator">password generator</a>; to check if a password is
          already in a breach, <a href="/tools/password-breach-checker">password breach checker</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type the password you want to evaluate.",
      "Read the strength score and entropy estimate.",
      "Fix any items the checklist flags red.",
      "Aim for &ldquo;Strong&rdquo; or better before using the password.",
    ],
  },
  "remove-duplicate-lines": {
    render: () => <RemoveDuplicateLines />,
    explainer: (
      <>
        <p>
          Paste a list of lines and strip duplicates in one click. Options let you keep first or last occurrence,
          preserve original order, ignore case, and trim whitespace before comparison. Stats show original line
          count, deduped count, and how many duplicates were removed.
        </p>
        <p>
          Great for cleaning email lists, log files, imported CSVs, and any messy text dump. For reordering lines
          see <a href="/tools/text-sorter">text sorter</a>; for line comparisons,{" "}
          <a href="/tools/diff-checker">diff checker</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste your list into the input textarea.",
      "Toggle case sensitivity, trim whitespace, and keep-first/keep-last as needed.",
      "Click Remove duplicates.",
      "Copy the deduped output.",
    ],
  },
  "text-sorter": {
    render: () => <TextSorter />,
    explainer: (
      <>
        <p>
          Sort any list of lines alphabetically, numerically, or by length — ascending or descending. Extra
          options: case-insensitive compare, reverse, and auto-remove empty lines. The sorter uses stable
          comparisons, so ties keep their input order.
        </p>
        <p>
          Handy for organizing CSV rows, to-do lists, config files, and data exports. To strip duplicates first
          use <a href="/tools/remove-duplicate-lines">remove duplicate lines</a>; to compare lists side by side,{" "}
          <a href="/tools/diff-checker">diff checker</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste your lines into the input.",
      "Pick alphabetical, numeric, or by length.",
      "Choose ascending or descending (and optional reverse).",
      "Copy the sorted output.",
    ],
  },
  "url-cleaner": {
    render: () => <UrlCleaner />,
    explainer: (
      <>
        <p>
          Strip tracking parameters from any URL before you share or store it. Removes utm_*, fbclid, gclid,
          msclkid, mc_*, ref, yclid, and 15+ other common analytics params by default. You can add your own
          extras. Paste one URL or many (one per line) — the cleaned versions come back in the same order.
        </p>
        <p>
          Useful for cleaner analytics, cleaner bookmarks, cleaner emails, and to prevent cross-site tracking on
          links you share. To encode/decode URL components, see{" "}
          <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste one or more URLs (one per line).",
      "Edit the extra-params list if you need custom strips.",
      "Click Clean.",
      "Copy the cleaned URLs.",
    ],
  },
  "color-picker": {
    render: () => <ColorPicker />,
    explainer: (
      <>
        <p>
          Pick any color with a native color picker or RGB/HSL sliders, and get the value in HEX, RGB, HSL, HSV,
          and CMYK — each with a one-click copy button. The big swatch preview makes it easy to compare shades
          before locking in a palette.
        </p>
        <p>
          Useful for designers, front-end devs, and anyone building a brand palette. For converting between one
          color format and another only, see <a href="/tools/color-converter">color converter</a>. To pull colors
          out of an image, <a href="/tools/color-extractor">color extractor</a>.
        </p>
      </>
    ),
    howToUse: [
      "Click the color preview or drag the RGB/HSL sliders.",
      "Watch HEX, RGB, HSL, HSV, CMYK update live.",
      "Copy any format with its copy button.",
      "Use the swatch to compare the chosen color visually.",
    ],
  },
  "gradient-generator": {
    render: () => <GradientGenerator />,
    explainer: (
      <>
        <p>
          Build CSS linear and radial gradients with a live preview. Pick the type, choose a direction or angle,
          add or remove color stops, and fine-tune the position of each. The tool outputs production-ready CSS
          you can paste straight into a stylesheet. Presets (sunset, ocean, forest, fire, twilight) give you a
          quick starting point.
        </p>
        <p>
          Great for hero sections, button backgrounds, and loading states. For solid-color work use{" "}
          <a href="/tools/color-picker">color picker</a>; for extracting a palette from an image,{" "}
          <a href="/tools/color-extractor">color extractor</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick linear or radial.",
      "Choose a direction (or click a preset to start from scratch).",
      "Add/remove color stops and drag their positions.",
      "Copy the CSS snippet into your stylesheet.",
    ],
  },
  "barcode-generator": {
    render: () => <BarcodeGenerator />,
    explainer: (
      <>
        <p>
          Generate a scannable Code39 barcode from any letters, numbers, and a handful of symbols (dash, period,
          space, dollar, slash, plus, percent). Rendered on a canvas in your browser, downloadable as a PNG,
          ready for inventory labels, event badges, asset tags, or homework projects.
        </p>
        <p>
          Code39 scans reliably on virtually any barcode reader and prints well at low resolution. For QR-style
          2D codes use <a href="/tools/qr-code-generator">QR code generator</a>; for smaller assets,{" "}
          <a href="/tools/favicon-generator">favicon generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type the text or number to encode (Code39 charset).",
      "Adjust size and scale to taste.",
      "Preview the barcode in the canvas.",
      "Click Download to save the PNG.",
    ],
  },
  "favicon-generator": {
    render: () => <FaviconGenerator />,
    explainer: (
      <>
        <p>
          Upload one square image (PNG or JPG) and get a full favicon set in six sizes — 16, 32, 48, 180
          (apple-touch), 192, and 512 px. Each size is rendered in your browser with a canvas resize and is
          downloadable as a standalone PNG. The tool also spits out the HTML{" "}
          <code>&lt;link&gt;</code> tags to paste into your <code>&lt;head&gt;</code>.
        </p>
        <p>
          Perfect for launching a new site without fiddling with image tools. For broader image work use{" "}
          <a href="/tools/image-resizer">image resizer</a> and{" "}
          <a href="/tools/image-format-converter">image format converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Upload a square PNG or JPG (at least 512×512 for best results).",
      "Preview each size in the grid.",
      "Download each PNG.",
      "Copy the HTML snippet into your <head>.",
    ],
  },
  "meta-tag-generator": {
    render: () => <MetaTagGenerator />,
    explainer: (
      <>
        <p>
          Generate a complete set of HTML meta tags — title, description, keywords, canonical, robots, Open
          Graph, and Twitter Card — from one form. The preview updates live and the final output is ready to
          paste into your <code>&lt;head&gt;</code>. Required for decent SEO and clean social previews.
        </p>
        <p>
          For richer OG/Twitter preview mockups see <a href="/tools/open-graph-generator">Open Graph
          generator</a>. For robots files, <a href="/tools/robots-txt-generator">robots.txt generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Fill in title, description, canonical URL, and socials.",
      "Pick robots directives (index/noindex, follow/nofollow).",
      "Copy the HTML output.",
      "Paste into your <head> and deploy.",
    ],
  },
  "robots-txt-generator": {
    render: () => <RobotsTxtGenerator />,
    explainer: (
      <>
        <p>
          Build a valid robots.txt file with multiple user-agent blocks, per-agent allow and disallow paths, an
          optional crawl-delay, and a sitemap URL. Download it as a text file and upload to your site root. The
          default starts with a sensible baseline (disallow /admin/, /private/, sitemap pointer).
        </p>
        <p>
          Pair with <a href="/tools/meta-tag-generator">meta tag generator</a> and{" "}
          <a href="/tools/open-graph-generator">Open Graph generator</a> to round out on-page SEO basics.
        </p>
      </>
    ),
    howToUse: [
      "Pick a user-agent (* for all) or add specific ones.",
      "Add allow and disallow paths per agent.",
      "Set crawl-delay and sitemap URL if needed.",
      "Copy or download robots.txt.",
    ],
  },
  "open-graph-generator": {
    render: () => <OpenGraphGenerator />,
    explainer: (
      <>
        <p>
          Preview exactly how your page appears when shared on Facebook and Twitter — and generate the HTML meta
          tags to match. Fill in title, description, image URL, and the tool shows illustrative mockups plus
          production-ready <code>&lt;meta property=&quot;og:…&quot;&gt;</code> and Twitter Card tags.
        </p>
        <p>
          Good-looking social previews dramatically boost click-through. For broader meta tags use{" "}
          <a href="/tools/meta-tag-generator">meta tag generator</a>; for favicons,{" "}
          <a href="/tools/favicon-generator">favicon generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter title, description, URL, and image URL.",
      "Pick OG type and Twitter card type.",
      "Compare the Facebook and Twitter preview mockups.",
      "Copy the HTML meta tags into your <head>.",
    ],
  },
  "keyword-density-checker": {
    render: () => <KeywordDensityChecker />,
    explainer: (
      <>
        <p>
          Paste an article to see its word count, reading time, unique words, and the top 20 keywords by
          frequency with percent density. Optionally enter a target keyword to check whether it falls in the
          healthy 0.5 – 3 % range — too low looks thin, too high looks spammy. A stopwords toggle filters common
          filler words for a cleaner top-terms list.
        </p>
        <p>
          Useful for on-page SEO and long-form writing. Pair with{" "}
          <a href="/tools/readability-score-checker">readability score checker</a> to keep copy approachable, or{" "}
          <a href="/tools/word-counter">word counter</a> for a quick length check.
        </p>
      </>
    ),
    howToUse: [
      "Paste your article into the textarea.",
      "Optionally enter a target keyword.",
      "Toggle stopwords on to filter common words.",
      "Review the top terms and density warnings.",
    ],
  },
  "business-name-generator": {
    render: () => <BusinessNameGenerator />,
    explainer: (
      <>
        <p>
          Generate 30+ brand name ideas by combining a core keyword with curated prefixes (Neo, Try, Zap, Flux,
          Nova, Pulse) and suffixes (Hub, Labs, Studio, Forge, Spark, Kit, Stack). Filter by industry (tech,
          retail, food, health, finance, creative) for vibe-appropriate picks, and see camelCase, lowercase, and
          domain-style (.io, .co, .app) variants. Regenerate for fresh options.
        </p>
        <p>
          For matching slugs use <a href="/tools/slug-generator">slug generator</a>; for placeholder copy,{" "}
          <a href="/tools/lorem-ipsum-generator">lorem ipsum</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter a core keyword.",
      "Pick an industry or leave it on generic.",
      "Scroll the generated list.",
      "Click regenerate until a name clicks — then copy it.",
    ],
  },

  // ==================== WAVE 7: UTILITY DOMINANCE (81) ====================

  "txt-splitter": {
    render: () => <TxtSplitter />,
    explainer: (
      <>
        <p>
          A free TXT splitter that breaks a big plain-text file into equal chunks — by line count, character
          count, or byte size — and gives you a ZIP (or individual files) to download. Everything happens in your
          browser, so you can split log files, exports, or imports that contain sensitive data without uploading
          anything to a server.
        </p>
        <p>
          Use it when an LLM has a token limit, when a mail merge needs batches of 500, or when an import tool
          chokes above 10 MB. Pair with <a href="/tools/text-joiner">text joiner</a> to stitch the parts back
          together, <a href="/tools/line-counter">line counter</a> to size chunks correctly, or{" "}
          <a href="/tools/csv-cleaner">CSV cleaner</a> if you're really working with tabular data.
        </p>
      </>
    ),
    howToUse: [
      "Paste text or drop a .txt file.",
      "Pick a split mode: by lines, by characters, or by bytes.",
      "Set the chunk size — e.g. 500 lines per file.",
      "Download the chunks individually or as a ZIP.",
    ],
  },
  "text-joiner": {
    render: () => <TextJoiner />,
    explainer: (
      <>
        <p>
          Paste multiple text blocks or drop a set of files and merge them into a single output, separated by a
          newline, tab, comma, or any custom string you pick. The tool also lets you keep or strip empty lines,
          trim whitespace on each block, and dedupe repeated entries before joining.
        </p>
        <p>
          Useful for stitching together chunks produced by <a href="/tools/txt-splitter">TXT splitter</a>, merging
          a day's logs, or combining scraped lists. If the result is CSV-shaped, open it in{" "}
          <a href="/tools/csv-viewer">CSV viewer</a>. For cleanup, see{" "}
          <a href="/tools/line-break-remover">line break remover</a> and{" "}
          <a href="/tools/remove-duplicate-lines">remove duplicate lines</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste each block into a new textarea, or drop files.",
      "Pick a separator — newline, tab, comma, or custom string.",
      "Toggle trim, dedupe, and skip-empty as needed.",
      "Copy the joined output or download it as a .txt.",
    ],
  },
  "csv-viewer": {
    render: () => <CsvViewer />,
    explainer: (
      <>
        <p>
          Drop a CSV and see it rendered as a clean, sortable, searchable table — no spreadsheet app needed. The
          viewer handles quoted fields, embedded commas, newlines inside cells, and a detected delimiter
          (comma, semicolon, tab). Nothing is uploaded; parsing runs in your browser.
        </p>
        <p>
          Great for sanity-checking an export before you import it, previewing a dataset someone emailed you, or
          confirming the delimiter is what you expect. If the file needs cleanup, run it through{" "}
          <a href="/tools/csv-cleaner">CSV cleaner</a>; to convert it, try{" "}
          <a href="/tools/csv-to-json">CSV to JSON</a> or <a href="/tools/tsv-to-csv">TSV to CSV</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop a .csv file or paste CSV text.",
      "Confirm the detected delimiter (comma / semicolon / tab).",
      "Use the search box to filter, or click a header to sort.",
      "Scan the row and column counts at the top of the table.",
    ],
  },
  "csv-cleaner": {
    render: () => <CsvCleaner />,
    explainer: (
      <>
        <p>
          A CSV cleaner that fixes the things that break imports: trims whitespace in every cell, collapses double
          quotes, normalizes line endings to <code>\n</code>, removes empty rows, dedupes rows by any column, and
          escapes stray commas inside fields. Drop a file or paste CSV, toggle the rules you need, and copy the
          cleaned output.
        </p>
        <p>
          Pair with <a href="/tools/csv-viewer">CSV viewer</a> to check the before/after, or{" "}
          <a href="/tools/csv-to-json">CSV to JSON</a> if you need the cleaned data in JSON. When the file's
          really tab-separated, start with <a href="/tools/tsv-to-csv">TSV to CSV</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop your CSV file or paste rows.",
      "Turn on the cleanups you need — trim, dedupe, normalize line endings.",
      "Pick a dedupe key column if you want row-level deduping.",
      "Copy the cleaned CSV or download it.",
    ],
  },
  "tsv-to-csv": {
    render: () => <TsvToCsv />,
    explainer: (
      <>
        <p>
          Convert tab-separated values to CSV (or CSV to TSV) with proper quoting for fields that contain commas,
          quotes, or newlines. Useful when a spreadsheet export comes out as tabs but the tool you're feeding it
          to only accepts CSV — Google Sheets imports, many CRMs, and most ETL pipelines.
        </p>
        <p>
          For other tabular conversions, see <a href="/tools/csv-to-json">CSV to JSON</a> or{" "}
          <a href="/tools/json-to-csv">JSON to CSV</a>. Inspect the result in{" "}
          <a href="/tools/csv-viewer">CSV viewer</a>, or clean up messy input with{" "}
          <a href="/tools/csv-cleaner">CSV cleaner</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste TSV or drop a .tsv file.",
      "Optionally toggle direction: TSV → CSV, or CSV → TSV.",
      "Pick quoting: always, minimal, or none.",
      "Copy the converted output or download it.",
    ],
  },
  "line-break-remover": {
    render: () => <LineBreakRemover />,
    explainer: (
      <>
        <p>
          Strip newlines from pasted text and replace them with a space, comma, or custom string — turning a
          column of values into a single comma-separated list, or an email body with soft wraps into a clean
          paragraph. Also handles Windows <code>\r\n</code>, Mac <code>\r</code>, and Unicode line separators.
        </p>
        <p>
          For more aggressive cleanup try <a href="/tools/whitespace-remover">whitespace remover</a> or{" "}
          <a href="/tools/special-character-remover">special character remover</a>. Going the other way?{" "}
          <a href="/tools/text-joiner">Text joiner</a> splits by separator and glues back with newlines.
        </p>
      </>
    ),
    howToUse: [
      "Paste your text.",
      "Pick the replacement: space, comma, custom, or nothing.",
      "Toggle collapse-multiple so runs of newlines don't double up.",
      "Copy the cleaned output.",
    ],
  },
  "whitespace-remover": {
    render: () => <WhitespaceRemover />,
    explainer: (
      <>
        <p>
          Collapse runs of spaces, tabs, and newlines into a single space, trim leading and trailing whitespace on
          every line, or strip whitespace entirely. Handy for cleaning scraped text, normalizing code, or fixing
          accidental double-spacing after a find-and-replace.
        </p>
        <p>
          Combine with <a href="/tools/invisible-character-detector">invisible character detector</a> when
          whitespace looks wrong but isn't actually spaces, or <a href="/tools/line-break-remover">line break
          remover</a> when you also want to flatten paragraphs. Formatting code? See{" "}
          <a href="/tools/html-formatter">HTML formatter</a> or <a href="/tools/json-formatter">JSON formatter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the text.",
      "Pick the mode: collapse, trim lines, or strip all whitespace.",
      "Toggle per-line trim or global collapse.",
      "Copy the cleaned result.",
    ],
  },
  "invisible-character-detector": {
    render: () => <InvisibleCharacterDetector />,
    explainer: (
      <>
        <p>
          Find zero-width spaces, byte-order marks, non-breaking spaces, and other invisible Unicode characters
          that quietly break CSV imports, URL slugs, passwords, and code diffs. The detector highlights every
          invisible character in place with its Unicode codepoint, and offers a one-click strip.
        </p>
        <p>
          If the issue is mixed character forms rather than hidden characters, run{" "}
          <a href="/tools/unicode-text-normalizer">Unicode text normalizer</a>. For general cleanup see{" "}
          <a href="/tools/whitespace-remover">whitespace remover</a> or{" "}
          <a href="/tools/special-character-remover">special character remover</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the suspicious text.",
      "Scan the highlighted codepoints above the textarea.",
      "Click Strip to remove them, or Replace to swap for a visible substitute.",
      "Copy the cleaned text.",
    ],
  },
  "special-character-remover": {
    render: () => <SpecialCharacterRemover />,
    explainer: (
      <>
        <p>
          Remove accents, emojis, punctuation, symbols, or anything outside plain ASCII from a paste. Use
          category toggles to keep exactly what you need — letters, digits, basic punctuation, whitespace — and
          choose whether to strip or transliterate (é → e).
        </p>
        <p>
          Useful for cleaning filenames (try <a href="/tools/filename-cleaner">filename cleaner</a>), URL slugs
          (<a href="/tools/slug-generator">slug generator</a>), or database keys. For invisible-char issues
          specifically, use <a href="/tools/invisible-character-detector">invisible character detector</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the text.",
      "Toggle which categories to keep: letters, digits, whitespace, punctuation.",
      "Choose strip or transliterate for accents.",
      "Copy the cleaned output.",
    ],
  },
  "unicode-text-normalizer": {
    render: () => <UnicodeTextNormalizer />,
    explainer: (
      <>
        <p>
          Normalize text using NFC, NFD, NFKC, or NFKD — the four standard Unicode normalization forms. Use NFC
          (the web default) to unify combining characters into precomposed forms, NFKC to also collapse
          compatibility characters (ﬁ → fi, ① → 1). Great for fixing copy-paste weirdness, broken accents, and
          search mismatches.
        </p>
        <p>
          Related: <a href="/tools/invisible-character-detector">invisible character detector</a>,{" "}
          <a href="/tools/special-character-remover">special character remover</a>, and{" "}
          <a href="/tools/html-entity-encoder-decoder">HTML entity encoder</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the text that looks odd.",
      "Pick a normalization form — NFC is the safe default.",
      "Read the before/after and the number of codepoints changed.",
      "Copy the normalized result.",
    ],
  },
  "bullet-list-cleaner": {
    render: () => <BulletListCleaner />,
    explainer: (
      <>
        <p>
          Paste a list with mixed bullets (•, -, *, 1., a), Roman numerals, tabs) and get a clean output: bullets
          stripped, normalized to a single marker of your choice, or swapped to numbered. Fixes the daily mess of
          pasting from Notion, Google Docs, PDFs, or webpages.
        </p>
        <p>
          Pair with <a href="/tools/remove-duplicate-lines">remove duplicate lines</a> to dedupe first, or{" "}
          <a href="/tools/text-sorter">text sorter</a> to alphabetize after cleaning. Building a table instead? Try{" "}
          <a href="/tools/markdown-table-generator">markdown table generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the list.",
      "Choose: strip markers, normalize to a single bullet, or number the items.",
      "Pick the target marker if normalizing (•, -, *, or custom).",
      "Copy the clean list.",
    ],
  },
  "sentence-counter": {
    render: () => <SentenceCounter />,
    explainer: (
      <>
        <p>
          Count sentences in pasted text with average sentence length, longest and shortest sentence, and a live
          reading-time estimate. Good for editing essays, tightening blog intros, and checking whether a page
          matches a plain-English style guide.
        </p>
        <p>
          Pair with <a href="/tools/paragraph-counter">paragraph counter</a> for structure checks,{" "}
          <a href="/tools/readability-score-checker">readability score checker</a> for grade-level analysis, and{" "}
          <a href="/tools/word-counter">word counter</a> when a target word count matters.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the textarea.",
      "Read the headline sentence count.",
      "Scan the shortest and longest sentence samples.",
      "Use the stats to tighten wordy sentences.",
    ],
  },
  "paragraph-counter": {
    render: () => <ParagraphCounter />,
    explainer: (
      <>
        <p>
          Count paragraphs in any text, with average word count per paragraph and a live outline that shows the
          first few words of each. Useful for long-form writing where structure matters — blog posts, essays, and
          reports with a target paragraph count.
        </p>
        <p>
          Combine with <a href="/tools/sentence-counter">sentence counter</a>,{" "}
          <a href="/tools/reading-time-estimator">reading time estimator</a>, and{" "}
          <a href="/tools/word-counter">word counter</a> to get a complete view of a draft before you publish.
        </p>
      </>
    ),
    howToUse: [
      "Paste your draft into the textarea.",
      "Read paragraph count, words per paragraph, and longest paragraph.",
      "Scan the outline strip to see the opening of each paragraph.",
      "Break up paragraphs that are too long or merge ones that are too short.",
    ],
  },
  "markdown-table-generator": {
    render: () => <MarkdownTableGenerator />,
    explainer: (
      <>
        <p>
          Build a markdown table visually — add or remove columns and rows, pick per-column alignment (left,
          center, right), edit cells inline, and copy the formatted markdown. Works for GitHub, docs, Notion, and
          most static-site generators. Starts with a small sample so you can see how it renders.
        </p>
        <p>
          Need plain HTML instead? Use <a href="/tools/table-generator">HTML table generator</a>. To convert
          markdown to HTML after, try <a href="/tools/markdown-to-html">markdown to HTML</a>. Working the other
          direction? <a href="/tools/html-to-markdown">HTML to markdown</a>.
        </p>
      </>
    ),
    howToUse: [
      "Use + Row / + Column to size the table.",
      "Type headers in the top row, then fill cells below.",
      "Set per-column alignment with the L / C / R selector.",
      "Click Copy to grab the markdown.",
    ],
  },
  "table-generator": {
    render: () => <TableGenerator />,
    explainer: (
      <>
        <p>
          A visual HTML table builder that outputs clean, semantic <code>&lt;table&gt;</code> markup. Toggle a
          header row, striped rows, borders, and per-column alignment. Handy for adding a simple comparison or
          pricing table to a blog post without opening a code editor.
        </p>
        <p>
          If you'd rather have markdown, use <a href="/tools/markdown-table-generator">markdown table
          generator</a>. Format the final HTML with <a href="/tools/html-formatter">HTML formatter</a>. Going the
          other way? <a href="/tools/html-to-markdown">HTML to markdown</a>.
        </p>
      </>
    ),
    howToUse: [
      "Set rows and columns with + / − buttons.",
      "Toggle header row, striped, bordered, or compact variants.",
      "Type cell contents inline.",
      "Copy the HTML or preview the rendered result.",
    ],
  },
  "xml-to-json": {
    render: () => <XmlToJson />,
    explainer: (
      <>
        <p>
          Paste any well-formed XML and get a JSON representation that preserves attributes, namespaces, and the
          nesting structure. Works for RSS feeds, SOAP payloads, sitemaps, Android layouts, and anything you'd
          rather read as JSON.
        </p>
        <p>
          Going the other direction? Use <a href="/tools/json-to-xml">JSON to XML</a>. Format either side with{" "}
          <a href="/tools/json-formatter">JSON formatter</a> or <a href="/tools/xml-formatter">XML formatter</a>.
          For YAML ↔ JSON, see <a href="/tools/yaml-json-converter">YAML JSON converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste XML into the input.",
      "Pick how attributes are represented (e.g. @attr prefix).",
      "Click Convert — errors show the exact XML issue.",
      "Copy the JSON output or download as a file.",
    ],
  },
  "json-to-xml": {
    render: () => <JsonToXml />,
    explainer: (
      <>
        <p>
          Convert JSON to well-formed XML with indentation. Pick a root element name, an attribute prefix, and
          whether keys starting with that prefix become attributes or child elements. Useful when integrating
          modern APIs with legacy systems that only accept XML.
        </p>
        <p>
          Pair with <a href="/tools/xml-to-json">XML to JSON</a> for round-trip conversions,{" "}
          <a href="/tools/xml-formatter">XML formatter</a> to tidy output, and{" "}
          <a href="/tools/yaml-json-converter">YAML JSON converter</a> for YAML workflows.
        </p>
      </>
    ),
    howToUse: [
      "Paste your JSON.",
      "Name the root element (default: root).",
      "Pick attribute handling and indentation width.",
      "Copy the XML output or download.",
    ],
  },
  "yaml-formatter": {
    render: () => <YamlFormatter />,
    explainer: (
      <>
        <p>
          Paste YAML and get it validated, indented, and pretty-printed. Catches common mistakes — accidental
          tabs, mis-indented lists, trailing colons — with line-specific error messages. All parsing happens in
          your browser, so config files with secrets never leave the page.
        </p>
        <p>
          Convert to JSON with <a href="/tools/yaml-json-converter">YAML JSON converter</a>, compare with{" "}
          <a href="/tools/json-diff-checker">JSON diff checker</a>, or inspect a full JSON payload using{" "}
          <a href="/tools/json-formatter">JSON formatter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste YAML into the input box.",
      "Click Format — invalid YAML shows a line-anchored error.",
      "Pick 2 or 4-space indent.",
      "Copy the formatted output.",
    ],
  },
  "json-diff-checker": {
    render: () => <JsonDiffChecker />,
    explainer: (
      <>
        <p>
          Compare two JSON payloads and see every added, removed, and changed key highlighted — including deep
          nested changes inside arrays and objects. Perfect for diffing two API responses, a schema change, or a
          config file across environments.
        </p>
        <p>
          For line-level text diffs try <a href="/tools/diff-checker">diff checker</a>. Format either side first
          with <a href="/tools/json-formatter">JSON formatter</a>, and for YAML try{" "}
          <a href="/tools/yaml-formatter">YAML formatter</a> before converting.
        </p>
      </>
    ),
    howToUse: [
      "Paste JSON A in the left box and JSON B on the right.",
      "Click Compare — changes are highlighted per key.",
      "Use the summary at the top to see total added / removed / changed.",
      "Copy the diff report or individual changes.",
    ],
  },
  "html-entity-encoder-decoder": {
    render: () => <HtmlEntityEncoderDecoder />,
    explainer: (
      <>
        <p>
          Escape or unescape HTML entities — <code>&amp;amp;</code>, <code>&amp;lt;</code>,{" "}
          <code>&amp;copy;</code>, numeric references like <code>&amp;#169;</code>, and hex references. Useful
          when pasting HTML into CMS fields that break on raw <code>&lt;</code>, or when you've received encoded
          text and want the readable version.
        </p>
        <p>
          Related: <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>,{" "}
          <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>, and{" "}
          <a href="/tools/unicode-text-normalizer">Unicode text normalizer</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste text into either the raw or encoded box.",
      "Click Encode (raw → entity) or Decode (entity → raw).",
      "Toggle whether to escape non-ASCII too.",
      "Copy the converted version.",
    ],
  },
  "utm-builder": {
    render: () => <UtmBuilder />,
    explainer: (
      <>
        <p>
          Build clean UTM URLs for Google Analytics, GA4, Matomo, and any other analytics tool that reads UTM
          parameters. Fill in source, medium, campaign, and optional term and content, and the tool outputs a
          URL-encoded link ready to paste into email, social, or ads.
        </p>
        <p>
          To read parameters off an inbound link, use <a href="/tools/utm-parser">UTM parser</a>. To strip
          tracking from a URL, try <a href="/tools/url-cleaner">URL cleaner</a>. For details on the parameters,
          read our guide on <a href="/guides/how-to-use-utm-parameters">how to use UTM parameters</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the base URL you want to tag.",
      "Fill in source, medium, campaign (required) and term / content if needed.",
      "Review the encoded preview.",
      "Copy the full tagged URL or the link with a short label.",
    ],
  },
  "utm-parser": {
    render: () => <UtmParser />,
    explainer: (
      <>
        <p>
          Paste any URL and see its utm_source, utm_medium, utm_campaign, utm_term, utm_content, and every
          other query parameter broken out in a clean table. Click through to see the decoded values so you can
          spot typos or stray spaces that break reporting.
        </p>
        <p>
          To build a new tagged URL use <a href="/tools/utm-builder">UTM builder</a>. Clean the URL of tracking
          with <a href="/tools/url-cleaner">URL cleaner</a>. For a general URL breakdown, see{" "}
          <a href="/tools/url-parser">URL parser</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the URL with UTM parameters.",
      "Read the UTM table at the top and the full query table below.",
      "Copy any single value with its copy button.",
      "Fix typos back at the source if something looks wrong.",
    ],
  },
  "serp-snippet-preview": {
    render: () => <SerpSnippetPreview />,
    explainer: (
      <>
        <p>
          Preview exactly how a page will appear in Google search — title, breadcrumb URL, and description — with
          live pixel-width gauges for both mobile and desktop results. Useful while writing metadata before
          publishing, so you don't ship a title that gets truncated with an ellipsis.
        </p>
        <p>
          To check each field on its own, use <a href="/tools/title-tag-length-checker">title tag length
          checker</a> or <a href="/tools/meta-description-length-checker">meta description length checker</a>. For
          the full tag block, <a href="/tools/meta-tag-generator">meta tag generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type your title, URL, and meta description.",
      "Toggle mobile and desktop previews.",
      "Watch the pixel width gauges — keep title under ~600 px.",
      "Tweak copy until both previews look clean and complete.",
    ],
  },
  "schema-markup-generator": {
    render: () => <SchemaMarkupGenerator />,
    explainer: (
      <>
        <p>
          Generate valid JSON-LD for the schema types most sites actually need: Article, Product, LocalBusiness,
          BreadcrumbList, Organization, Person, Event. Pick a type, fill the fields, and copy a JSON-LD block you
          can paste straight into your <code>&lt;head&gt;</code>.
        </p>
        <p>
          For FAQ schema specifically use <a href="/tools/faq-schema-generator">FAQ schema generator</a>. Learn
          what it is and when to use it in our guide on{" "}
          <a href="/guides/what-is-schema-markup">what is schema markup</a>. Pair with{" "}
          <a href="/tools/meta-tag-generator">meta tag generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a schema type — Article, Product, etc.",
      "Fill the required fields; optional ones are labeled.",
      "Validate in the live preview — missing required fields are flagged.",
      "Copy the JSON-LD and paste inside <script type=\"application/ld+json\"> in <head>.",
    ],
  },
  "faq-schema-generator": {
    render: () => <FaqSchemaGenerator />,
    explainer: (
      <>
        <p>
          Enter a list of question/answer pairs and get valid FAQPage JSON-LD — the exact markup Google uses for
          FAQ rich results in search. Works well for blog posts with common-question sections and product pages
          with specs framed as questions.
        </p>
        <p>
          For other schema types use <a href="/tools/schema-markup-generator">schema markup generator</a>. Pair
          with <a href="/tools/serp-snippet-preview">SERP snippet preview</a> and{" "}
          <a href="/tools/meta-tag-generator">meta tag generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add each Q/A pair — the tool grows as you type.",
      "Keep answers 1–3 sentences each; full sentences work best.",
      "Copy the generated JSON-LD.",
      "Paste inside <script type=\"application/ld+json\"> in the page's <head>.",
    ],
  },
  "title-tag-length-checker": {
    render: () => <TitleTagLengthChecker />,
    explainer: (
      <>
        <p>
          Google truncates page titles around 600 pixels on desktop (roughly 55–65 characters) and a bit less on
          mobile. This tool measures the actual pixel width of your title in the font Google uses, so you know
          whether the full title will survive — not just a rough character count.
        </p>
        <p>
          For the description field use <a href="/tools/meta-description-length-checker">meta description length
          checker</a>. See it in context with <a href="/tools/serp-snippet-preview">SERP snippet preview</a>. To
          write the whole meta block, <a href="/tools/meta-tag-generator">meta tag generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste your page title.",
      "Watch the pixel-width gauge — green, amber, red.",
      "Trim or tweak until both mobile and desktop stay in green.",
      "Copy the final title into your CMS.",
    ],
  },
  "meta-description-length-checker": {
    render: () => <MetaDescriptionLengthChecker />,
    explainer: (
      <>
        <p>
          Check if your meta description fits inside Google's roughly 160-character, ~920-pixel desktop limit and
          the shorter mobile budget. The tool shows pixel width plus character count, with live previews for
          both form factors. Useful for writing descriptions that display fully, not cut off mid-sentence.
        </p>
        <p>
          For titles, <a href="/tools/title-tag-length-checker">title tag length checker</a>. For the full
          result row, <a href="/tools/serp-snippet-preview">SERP snippet preview</a>. Learn what makes a good one
          in our guide on <a href="/guides/how-to-write-a-meta-description">how to write a meta description</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type your meta description.",
      "Watch character count and pixel-width gauges live.",
      "Edit until both mobile and desktop previews show the full text.",
      "Copy the final description and paste into your CMS.",
    ],
  },
  "headline-analyzer": {
    render: () => <HeadlineAnalyzer />,
    explainer: (
      <>
        <p>
          Score any headline on length, power words, emotional words, common/uncommon word balance, and reading
          level. Get concrete rewrites: too long, too vague, missing a hook. Useful for blog titles, ad
          headlines, email subject lines, and landing-page heroes.
        </p>
        <p>
          For email specifically use <a href="/tools/email-subject-line-tester">email subject line tester</a>.
          Check ad character limits with <a href="/tools/ad-copy-length-checker">ad copy length checker</a>. Pair
          with <a href="/tools/title-tag-length-checker">title tag length checker</a> for SEO titles.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste a headline.",
      "Read the score and the flagged issues.",
      "Apply the suggested rewrites and re-score.",
      "Copy the winning version when you're happy.",
    ],
  },
  "ad-copy-length-checker": {
    render: () => <AdCopyLengthChecker />,
    explainer: (
      <>
        <p>
          Check ad headlines and descriptions against the real character limits on Google Ads (30 / 90), Meta
          (40 / 125), LinkedIn (70 / 600), and others. Each field shows a progress bar against its platform
          limit, so you see at a glance which variants still need trimming.
        </p>
        <p>
          For broader headline scoring use <a href="/tools/headline-analyzer">headline analyzer</a>. For email
          lines, <a href="/tools/email-subject-line-tester">email subject line tester</a>. For plain character
          counts, <a href="/tools/character-counter">character counter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a platform: Google, Meta, LinkedIn, X.",
      "Type each headline and description variant.",
      "Watch the per-field bars — amber = close, red = over.",
      "Copy the compliant variants into your ad manager.",
    ],
  },
  "email-subject-line-tester": {
    render: () => <EmailSubjectLineTester />,
    explainer: (
      <>
        <p>
          Test an email subject line for length, spam-trigger words, excessive punctuation, and emoji rendering.
          Previews how the line looks on iPhone Mail and Gmail's inbox, where most subject lines get truncated
          around 40–60 characters. Essential for newsletter campaigns and cold outreach.
        </p>
        <p>
          For general headlines use <a href="/tools/headline-analyzer">headline analyzer</a>. For ad character
          limits, <a href="/tools/ad-copy-length-checker">ad copy length checker</a>. Pair with{" "}
          <a href="/tools/character-counter">character counter</a> for a clean count.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste a subject line.",
      "Read the score and the flagged issues (length, spam words, emoji risk).",
      "Compare the iPhone and Gmail previews.",
      "Iterate until the score and previews both look clean.",
    ],
  },
  "alt-text-helper": {
    render: () => <AltTextHelper />,
    explainer: (
      <>
        <p>
          Walks you through writing alt text the right way: decide whether the image is decorative (empty alt),
          informational (describe what matters), or functional (describe the action). Enforces a length budget
          (~125 characters) and flags common mistakes like "image of…" and redundant captions.
        </p>
        <p>
          Pair with <a href="/tools/image-dimensions-checker">image dimensions checker</a>,{" "}
          <a href="/tools/contrast-checker">contrast checker</a>, and{" "}
          <a href="/tools/social-media-image-sizes">social media image sizes</a> for a quick accessibility pass.
        </p>
      </>
    ),
    howToUse: [
      "Classify the image — decorative, informational, or functional.",
      "Write a description; the helper flags verbose phrases and length issues.",
      "Review the sample alt patterns for your use case.",
      "Copy the final alt text into your CMS.",
    ],
  },
  "cron-expression-builder": {
    render: () => <CronExpressionBuilder />,
    explainer: (
      <>
        <p>
          Build a cron schedule visually: minute, hour, day-of-month, month, day-of-week — each field gets a
          simple selector for every, specific, range, or step values. The tool previews the next five run times
          and the plain-English description, so you know exactly what you're scheduling.
        </p>
        <p>
          To decode an existing cron use <a href="/tools/cron-expression-explainer">cron expression
          explainer</a>. Convert timestamps with <a href="/tools/unix-timestamp-converter">unix timestamp
          converter</a>. Learn the syntax in{" "}
          <a href="/guides/how-to-write-a-cron-expression">how to write a cron expression</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick values for each of the 5 cron fields.",
      "Review the plain-English description above the expression.",
      "Scan the next 5 run times to sanity-check.",
      "Copy the resulting cron string into crontab, GitHub Actions, or your scheduler.",
    ],
  },
  "cron-expression-explainer": {
    render: () => <CronExpressionExplainer />,
    explainer: (
      <>
        <p>
          Paste a cron expression and read it in plain English — with the next five calculated run times. Works
          with standard 5-field cron, 6-field Quartz (second included), and Jenkins H syntax. Catches common
          mistakes like day-of-month + day-of-week conflicts.
        </p>
        <p>
          To build one from scratch use <a href="/tools/cron-expression-builder">cron expression builder</a>.
          See the guide on <a href="/guides/how-to-write-a-cron-expression">how to write a cron expression</a>.
          Working in a specific time zone? <a href="/tools/time-zone-converter">time zone converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the cron expression.",
      "Pick the flavor: standard, Quartz, or Jenkins.",
      "Read the English description and next 5 runs.",
      "Copy either side and iterate.",
    ],
  },
  "http-status-code-lookup": {
    render: () => <HttpStatusCodeLookup />,
    explainer: (
      <>
        <p>
          Search every HTTP status code — 200 OK, 301 Moved Permanently, 404 Not Found, 500 Internal Server
          Error, and the more obscure ones like 418, 429, and 451. Each entry includes a plain-English meaning,
          the RFC reference, and common causes, so you can tell a bad request from a server problem in a hurry.
        </p>
        <p>
          For MIME types use <a href="/tools/mime-type-lookup">MIME type lookup</a>. For URL breakdowns,{" "}
          <a href="/tools/url-parser">URL parser</a>. For schema markup,{" "}
          <a href="/tools/schema-markup-generator">schema markup generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type a status code number or keyword.",
      "Scan the matching results filtered by 2xx / 3xx / 4xx / 5xx.",
      "Click a code for full description, RFC link, and common causes.",
      "Copy the plain-English description into a bug report or docs.",
    ],
  },
  "mime-type-lookup": {
    render: () => <MimeTypeLookup />,
    explainer: (
      <>
        <p>
          Look up the correct Content-Type for any file extension (or the other way round). Covers images, fonts,
          video, audio, JSON, common office formats, and rarer ones like .webmanifest and .avif. Useful when
          debugging upload handlers or configuring nginx/Apache content-type rules.
        </p>
        <p>
          For HTTP status codes use <a href="/tools/http-status-code-lookup">HTTP status code lookup</a>. For
          image conversion, <a href="/tools/image-format-converter">image format converter</a>. For clean
          filenames, <a href="/tools/filename-cleaner">filename cleaner</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type a file extension (jpg, webp, pdf) or MIME type (image/*).",
      "Scan the matching rows with type, description, and safe-to-serve notes.",
      "Click Copy to grab the exact Content-Type string.",
      "Use it in your server config or upload validator.",
    ],
  },
  "url-parser": {
    render: () => <UrlParser />,
    explainer: (
      <>
        <p>
          Break a URL into its pieces — protocol, host, port, path, query, fragment — just like the browser's
          URL API but laid out as a readable table. Also shows each query parameter decoded in its own row so
          you can spot encoding issues.
        </p>
        <p>
          For query-string-only work use <a href="/tools/query-string-parser">query string parser</a>. For UTM
          tags specifically, <a href="/tools/utm-parser">UTM parser</a>. To strip tracking,{" "}
          <a href="/tools/url-cleaner">URL cleaner</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste any URL.",
      "Read each part in the table — protocol, host, path, etc.",
      "Inspect query parameters decoded in the lower table.",
      "Copy a single piece with its copy button.",
    ],
  },
  "query-string-parser": {
    render: () => <QueryStringParser />,
    explainer: (
      <>
        <p>
          Parse any URL's query string into key/value pairs — including repeated keys, array-style
          <code> key[]</code> keys, and bracket-notation <code>key[a][b]</code>. Shows raw and decoded values so
          you can catch double-encoding bugs.
        </p>
        <p>
          For the full URL breakdown use <a href="/tools/url-parser">URL parser</a>. For UTM parameters
          specifically, <a href="/tools/utm-parser">UTM parser</a>. To encode single values,{" "}
          <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste a URL or a raw query string.",
      "Read the parsed key/value rows.",
      "Toggle array-style parsing (brackets) if needed.",
      "Copy individual pairs or the whole table as JSON.",
    ],
  },
  "filename-cleaner": {
    render: () => <FilenameCleaner />,
    explainer: (
      <>
        <p>
          Clean filenames that are about to be uploaded, committed, or zipped: strips characters that fail on
          Windows (<code>&lt;&gt;:"/\|?*</code>), collapses spaces to hyphens, trims long names, and keeps the
          extension intact. Supports batch mode for a pasted list of filenames.
        </p>
        <p>
          Related: <a href="/tools/slug-generator">slug generator</a>,{" "}
          <a href="/tools/special-character-remover">special character remover</a>, and{" "}
          <a href="/tools/mime-type-lookup">MIME type lookup</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste one filename per line.",
      "Pick separator (dash / underscore / dot) and case.",
      "Toggle truncation, unicode stripping, and duplicate-dedupe.",
      "Copy the cleaned list.",
    ],
  },
  "line-counter": {
    render: () => <LineCounter />,
    explainer: (
      <>
        <p>
          Count lines in any text paste with a breakdown of total, blank, comment (for // and # styles), and code
          lines. Useful for quick LOC estimates, reviewing logs, and sizing chunks before running{" "}
          <a href="/tools/txt-splitter">TXT splitter</a>.
        </p>
        <p>
          Pair with <a href="/tools/character-counter">character counter</a>,{" "}
          <a href="/tools/word-counter">word counter</a>, and{" "}
          <a href="/tools/remove-duplicate-lines">remove duplicate lines</a> for a complete pass on a text file.
        </p>
      </>
    ),
    howToUse: [
      "Paste or drop a text file.",
      "Read the live stats — total, blank, code, comments.",
      "Pick the comment syntax if counting code files.",
      "Copy the report or export the breakdown.",
    ],
  },
  "box-shadow-generator": {
    render: () => <BoxShadowGenerator />,
    explainer: (
      <>
        <p>
          Visually build any CSS <code>box-shadow</code>: offset-x, offset-y, blur, spread, color, and optional
          inset. Stack multiple layers for soft, realistic shadows. The live preview shows the exact result, and
          you copy the full CSS rule in one click.
        </p>
        <p>
          Related design tools: <a href="/tools/border-radius-generator">border radius generator</a>,{" "}
          <a href="/tools/gradient-generator">gradient generator</a>,{" "}
          <a href="/tools/color-picker">color picker</a>, and <a href="/tools/contrast-checker">contrast
          checker</a>.
        </p>
      </>
    ),
    howToUse: [
      "Adjust offset, blur, spread, and color sliders.",
      "Add additional shadow layers if you want stacking.",
      "Toggle inset for inset shadows.",
      "Copy the resulting CSS rule.",
    ],
  },
  "border-radius-generator": {
    render: () => <BorderRadiusGenerator />,
    explainer: (
      <>
        <p>
          Design CSS <code>border-radius</code> with four independent corner controls and live preview. Copy the
          short form (<code>8px</code>), per-corner (<code>8px 16px 8px 16px</code>), or full 8-value elliptical
          form — exactly the CSS you'll paste.
        </p>
        <p>
          Pair with <a href="/tools/box-shadow-generator">box shadow generator</a>,{" "}
          <a href="/tools/gradient-generator">gradient generator</a>, and{" "}
          <a href="/tools/css-clamp-generator">CSS clamp generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drag the corner sliders to shape the rectangle.",
      "Toggle unified vs per-corner modes.",
      "Switch between px, %, and em units.",
      "Copy the CSS rule.",
    ],
  },
  "css-clamp-generator": {
    render: () => <CssClampGenerator />,
    explainer: (
      <>
        <p>
          Generate fluid CSS <code>clamp()</code> values for typography or spacing that scale smoothly between a
          minimum and maximum viewport width. Skips the hand math — enter min/max sizes and breakpoints, get a
          working rule that works across modern browsers.
        </p>
        <p>
          For media queries pair with <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>. For
          visual polish, <a href="/tools/box-shadow-generator">box shadow generator</a> and{" "}
          <a href="/tools/border-radius-generator">border radius generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter min size and max size (font-size or spacing).",
      "Enter min and max viewport widths in px.",
      "Pick unit (rem or px).",
      "Copy the clamp() rule.",
    ],
  },
  "flexbox-playground": {
    render: () => <FlexboxPlayground />,
    explainer: (
      <>
        <p>
          Experiment with every common flexbox property — <code>justify-content</code>, <code>align-items</code>,{" "}
          <code>flex-direction</code>, <code>flex-wrap</code>, gap, and item sizing — with an interactive demo.
          As you change controls, the CSS rule builds live in the output panel.
        </p>
        <p>
          For grid instead use <a href="/tools/grid-layout-generator">grid layout generator</a>. For visual
          polish, <a href="/tools/box-shadow-generator">box shadow generator</a> and{" "}
          <a href="/tools/border-radius-generator">border radius generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Toggle flex-direction, justify-content, align-items.",
      "Change item count and per-item flex basis.",
      "Watch the live preview update.",
      "Copy the generated parent + child CSS.",
    ],
  },
  "grid-layout-generator": {
    render: () => <GridLayoutGenerator />,
    explainer: (
      <>
        <p>
          Build a CSS Grid layout visually: define columns and rows, set gaps, name template areas by clicking
          cells. The tool outputs a full <code>grid-template-areas</code> rule and per-item placements you can
          paste straight into your stylesheet.
        </p>
        <p>
          For flexbox instead use <a href="/tools/flexbox-playground">flexbox playground</a>. For responsive
          sizing, <a href="/tools/css-clamp-generator">CSS clamp generator</a>. For preview polish,{" "}
          <a href="/tools/box-shadow-generator">box shadow generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Set column and row counts and sizes.",
      "Click cells to assign named areas (header, sidebar, main…).",
      "Adjust gap between tracks.",
      "Copy the full grid-template rule.",
    ],
  },
  "aspect-ratio-calculator": {
    render: () => <AspectRatioCalculator />,
    explainer: (
      <>
        <p>
          Keep images and video in proportion. Enter a width or height for a given aspect ratio (16:9, 4:3, 1:1,
          2.35:1) and the tool fills in the matching dimension. Also reverses: paste width and height and get
          the simplified ratio and closest standard.
        </p>
        <p>
          Pair with <a href="/tools/image-resizer">image resizer</a>,{" "}
          <a href="/tools/image-dimensions-checker">image dimensions checker</a>, and{" "}
          <a href="/tools/social-media-image-sizes">social media image sizes</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick or type an aspect ratio.",
      "Enter width — height fills in (or vice versa).",
      "Reverse mode: paste width and height, see the ratio.",
      "Copy the dimensions for your editor.",
    ],
  },
  "image-dimensions-checker": {
    render: () => <ImageDimensionsChecker />,
    explainer: (
      <>
        <p>
          Drop any image and see pixel width, pixel height, aspect ratio, and file size — instantly, in your
          browser, no upload. Supports JPG, PNG, GIF, WebP, AVIF, and SVG. Great for checking whether an image
          meets a platform's size requirements before posting.
        </p>
        <p>
          For platform specs, <a href="/tools/social-media-image-sizes">social media image sizes</a>. For
          resizing, <a href="/tools/image-resizer">image resizer</a>. For shrinking a file,{" "}
          <a href="/tools/image-compressor">image compressor</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop one or more images into the dropzone.",
      "Read width, height, aspect ratio, and file size in the table.",
      "Click any image to open a larger preview.",
      "Copy the dimensions line for your tracker or ticket.",
    ],
  },
  "contrast-checker": {
    render: () => <ContrastChecker />,
    explainer: (
      <>
        <p>
          Check a foreground/background color pair against WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large)
          and AAA (7:1 / 4.5:1) contrast targets. Live preview shows sample normal and large text on the chosen
          background, with pass/fail badges on both levels.
        </p>
        <p>
          Pair with <a href="/tools/color-picker">color picker</a>,{" "}
          <a href="/tools/color-converter">color converter</a>, and{" "}
          <a href="/tools/alt-text-helper">alt text helper</a> for an accessibility pass.
        </p>
      </>
    ),
    howToUse: [
      "Enter or pick foreground and background colors.",
      "Read the contrast ratio and AA/AAA badges.",
      "Nudge colors until both badges pass for your text size.",
      "Copy the final hex pair into your design system.",
    ],
  },
  "social-media-image-sizes": {
    render: () => <SocialMediaImageSizes />,
    explainer: (
      <>
        <p>
          An up-to-date (2026) reference of image sizes for Instagram, X, Facebook, LinkedIn, TikTok, YouTube,
          Pinterest, and threads. Covers feed posts, stories, covers, profile pictures, ad creative, and video
          thumbnails — all as a searchable, filterable table.
        </p>
        <p>
          Pair with <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>,{" "}
          <a href="/tools/image-resizer">image resizer</a>, and{" "}
          <a href="/tools/image-dimensions-checker">image dimensions checker</a>.
        </p>
      </>
    ),
    howToUse: [
      "Filter by platform or content type.",
      "Read the recommended width × height and aspect ratio.",
      "Click to copy the exact pixel dimensions.",
      "Create the image at that size or resize an existing one.",
    ],
  },
  "meme-text-formatter": {
    render: () => <MemeTextFormatter />,
    explainer: (
      <>
        <p>
          Turn plain text into styled Unicode variants — 𝐛𝐨𝐥𝐝, 𝑖𝑡𝑎𝑙𝑖𝑐, 𝓼𝓬𝓻𝓲𝓹𝓽, fullwidth
          ａｅｓｔｈｅｔｉｃ, monospace, ⓑⓤⓑⓑⓛⓔ, and more. These render almost anywhere because they're
          actual Unicode characters, not fonts.
        </p>
        <p>
          Related fun tools: <a href="/tools/text-reverser">text reverser</a>,{" "}
          <a href="/tools/case-converter">case converter</a>, and{" "}
          <a href="/tools/decision-wheel">decision wheel</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type any text.",
      "Scroll the styled variants — bold, italic, script, aesthetic.",
      "Click Copy on the variant you like.",
      "Paste into your bio, caption, or post.",
    ],
  },
  "invoice-generator": {
    render: () => <InvoiceGenerator />,
    explainer: (
      <>
        <p>
          A free, no-signup invoice generator for freelancers and small businesses. Add line items, quantities,
          rates, taxes, discounts, notes, and payment terms. Print to PDF from your browser — no watermark, no
          upload, no account to cancel later.
        </p>
        <p>
          Pair with <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>,{" "}
          <a href="/tools/freelance-rate-calculator">freelance rate calculator</a>, and{" "}
          <a href="/tools/vat-calculator">VAT calculator</a>. Learn the basics in{" "}
          <a href="/guides/how-to-make-a-simple-invoice">how to make a simple invoice</a>.
        </p>
      </>
    ),
    howToUse: [
      "Fill in your business details and client info.",
      "Add each line item — description, qty, rate.",
      "Set tax or VAT percentage and payment terms.",
      "Click Print and choose Save as PDF.",
    ],
  },
  "hourly-rate-calculator": {
    render: () => <HourlyRateCalculator />,
    explainer: (
      <>
        <p>
          Convert an annual salary into a real hourly rate, adjusting for unpaid time, holidays, sick days, and
          non-billable hours. Or go the other way: type an hourly rate and see what it implies as an annual
          income at various weekly workloads.
        </p>
        <p>
          For freelancers specifically use{" "}
          <a href="/tools/freelance-rate-calculator">freelance rate calculator</a>. Related:{" "}
          <a href="/tools/paycheck-calculator">paycheck calculator</a>,{" "}
          <a href="/tools/overtime-calculator">overtime calculator</a>. See{" "}
          <a href="/guides/how-to-price-freelance-work">how to price freelance work</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter annual salary (or hourly rate).",
      "Set holidays, sick days, and typical weekly hours.",
      "Adjust for unpaid overhead — admin, sales, learning.",
      "Read the true hourly rate and annual equivalents.",
    ],
  },
  "freelance-rate-calculator": {
    render: () => <FreelanceRateCalculator />,
    explainer: (
      <>
        <p>
          Work out a freelance rate that covers your actual costs: target take-home, taxes, benefits, software,
          hardware, billable vs non-billable ratio, and vacation. The tool outputs minimum hourly, target
          hourly, and a day-rate equivalent so you can quote with confidence.
        </p>
        <p>
          Pair with <a href="/tools/invoice-generator">invoice generator</a>,{" "}
          <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>, and{" "}
          <a href="/tools/pricing-calculator">pricing calculator</a>. See{" "}
          <a href="/guides/how-to-price-freelance-work">how to price freelance work</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter target yearly income.",
      "Set holiday weeks, sick days, and billable-hour percentage.",
      "Add business costs and taxes.",
      "Read minimum, target, and stretch hourly rates.",
    ],
  },
  "pricing-calculator": {
    render: () => <PricingCalculator />,
    explainer: (
      <>
        <p>
          Price a product or service to the margin you actually want. Enter cost, markup or margin, and optional
          tax, payment processing fees, and platform cuts. The tool shows the sale price, margin in dollars, and
          margin percent side by side.
        </p>
        <p>
          Related: <a href="/tools/profit-margin-calculator">profit margin calculator</a>,{" "}
          <a href="/tools/break-even-calculator">break-even calculator</a>,{" "}
          <a href="/tools/discount-calculator">discount calculator</a>. See{" "}
          <a href="/guides/how-to-calculate-profit-margin">how to calculate profit margin</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter product cost and target margin (or markup).",
      "Add tax, processing fees, and platform cuts.",
      "Read the clean sale price and dollar margin.",
      "Iterate until the price feels right.",
    ],
  },
  "cash-flow-calculator": {
    render: () => <CashFlowCalculator />,
    explainer: (
      <>
        <p>
          Add income and expense lines and see cash flow monthly, quarterly, and annually. A negative line or
          month turns red so you can spot shortfalls early. Works for personal finance, freelance months, or a
          small side business.
        </p>
        <p>
          Pair with <a href="/tools/startup-runway-calculator">startup runway calculator</a>,{" "}
          <a href="/tools/budget-calculator">budget calculator</a>, and{" "}
          <a href="/tools/profit-margin-calculator">profit margin calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add each income line with its monthly amount.",
      "Add each expense line the same way.",
      "Read monthly, quarterly, and annual totals.",
      "Trim expenses or boost income until cash flow is positive.",
    ],
  },
  "startup-runway-calculator": {
    render: () => <StartupRunwayCalculator />,
    explainer: (
      <>
        <p>
          Enter cash on hand and monthly net burn — get runway in months and days, with a projected zero-date
          and the burn-reduction or revenue needed to add 3, 6, or 12 months. Essential for solo founders and
          pre-seed teams who need to think in quarters, not years.
        </p>
        <p>
          Related: <a href="/tools/cash-flow-calculator">cash flow calculator</a>,{" "}
          <a href="/tools/break-even-calculator">break-even calculator</a>, and{" "}
          <a href="/tools/budget-calculator">budget calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter cash balance.",
      "Enter monthly burn (or monthly gross expenses + revenue).",
      "Optionally add monthly growth in revenue.",
      "Read months of runway and the zero-date.",
    ],
  },
  "subscription-cost-calculator": {
    render: () => <SubscriptionCostCalculator />,
    explainer: (
      <>
        <p>
          List every subscription — Netflix, Spotify, iCloud, Adobe, SaaS tools — and see the true monthly and
          annual cost. A subtle forcing function: seeing "I'm spending $2,400/yr on things I forgot about" often
          triggers a useful purge.
        </p>
        <p>
          Pair with <a href="/tools/budget-calculator">budget calculator</a>,{" "}
          <a href="/tools/cash-flow-calculator">cash flow calculator</a>, and{" "}
          <a href="/tools/expense-split-calculator">expense split calculator</a> if you share any of them.
        </p>
      </>
    ),
    howToUse: [
      "Add each subscription name and price.",
      "Set billing frequency (monthly / annual / weekly).",
      "Read the total monthly and annual cost.",
      "Sort by price and start cutting from the top.",
    ],
  },
  "expense-split-calculator": {
    render: () => <ExpenseSplitCalculator />,
    explainer: (
      <>
        <p>
          Add who paid for what on a group trip or project and get the fewest-transaction way to settle up.
          Handles uneven splits, partial shares (one person ducked out of dinner), and multiple currencies.
          Nothing is uploaded; all math runs in your browser.
        </p>
        <p>
          Related: <a href="/tools/bill-split-calculator">bill split calculator</a>,{" "}
          <a href="/tools/rent-split-calculator">rent split calculator</a>,{" "}
          <a href="/tools/tip-calculator">tip calculator</a>. Full walkthrough:{" "}
          <a href="/guides/how-to-split-expenses-fairly">how to split expenses fairly</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add each person in the group.",
      "Enter each expense — who paid, how much, who's in.",
      "Review the per-person balance.",
      "Follow the minimized settle-up instructions.",
    ],
  },
  "bill-split-calculator": {
    render: () => <BillSplitCalculator />,
    explainer: (
      <>
        <p>
          Split a restaurant bill cleanly: even shares, by-item, with tax and tip rolled in, and rounded for
          cash. Handles the "someone skipped the wine" case by letting you assign each item to a subset.
        </p>
        <p>
          Related: <a href="/tools/tip-calculator">tip calculator</a>,{" "}
          <a href="/tools/expense-split-calculator">expense split calculator</a>,{" "}
          <a href="/tools/rent-split-calculator">rent split calculator</a>,{" "}
          <a href="/tools/discount-calculator">discount calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter items and prices, or a total bill.",
      "Assign people to each item (for the uneven case).",
      "Set tip percent and tax.",
      "Read each person's total and adjust if needed.",
    ],
  },
  "rent-split-calculator": {
    render: () => <RentSplitCalculator />,
    explainer: (
      <>
        <p>
          Split rent fairly in a share house — equal, by room size (sq ft), by income, or a weighted blend. Saves
          the awkward conversation by letting everyone see a transparent breakdown.
        </p>
        <p>
          Related: <a href="/tools/expense-split-calculator">expense split calculator</a>,{" "}
          <a href="/tools/bill-split-calculator">bill split calculator</a>,{" "}
          <a href="/tools/budget-calculator">budget calculator</a>,{" "}
          <a href="/tools/mortgage-calculator">mortgage calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter total rent and each person's room details (size or share).",
      "Pick a method: equal, by room size, by income, or custom weights.",
      "Read the per-person monthly amount.",
      "Share the breakdown — copy as a plain-text summary.",
    ],
  },
  "overtime-calculator": {
    render: () => <OvertimeCalculator />,
    explainer: (
      <>
        <p>
          Calculate overtime pay with time-and-a-half and double-time rules, including the US federal 40-hour
          weekly threshold and common state rules (California's 8/day, 40/week, 12/day doubles). Works for
          hourly employees and salaried non-exempt.
        </p>
        <p>
          Pair with <a href="/tools/paycheck-calculator">paycheck calculator</a>,{" "}
          <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>,{" "}
          <a href="/tools/pto-calculator">PTO calculator</a>, and{" "}
          <a href="/tools/shift-scheduler">shift scheduler</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter hourly rate and weekly hours.",
      "Pick a rule set (US federal, California, or custom).",
      "Break out day-by-day if needed.",
      "Read regular, overtime, and double-time dollars.",
    ],
  },
  "pto-calculator": {
    render: () => <PtoCalculator />,
    explainer: (
      <>
        <p>
          Track paid time off by pay period and see your current balance plus projected year-end. Supports hourly
          and salaried accrual, carry-over caps, and a start-of-year balance. Useful during benefits enrollment
          and when planning a trip.
        </p>
        <p>
          Related: <a href="/tools/overtime-calculator">overtime calculator</a>,{" "}
          <a href="/tools/paycheck-calculator">paycheck calculator</a>,{" "}
          <a href="/tools/deadline-calculator">deadline calculator</a>, and{" "}
          <a href="/tools/shift-scheduler">shift scheduler</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter starting balance and accrual rate.",
      "Set pay-period frequency (weekly, biweekly, monthly).",
      "Enter PTO taken this year so far.",
      "Read current balance and projected year-end.",
    ],
  },
  "shift-scheduler": {
    render: () => <ShiftScheduler />,
    explainer: (
      <>
        <p>
          Plan a weekly shift rotation for a small team — name each teammate, pick their available days, set
          shift length, and print a clean schedule. Supports fixed patterns (same shift weekly) and simple
          rotations (A/B weeks). Great for small retail, ops, or coverage teams.
        </p>
        <p>
          Pair with <a href="/tools/overtime-calculator">overtime calculator</a>,{" "}
          <a href="/tools/weekly-planner">weekly planner</a>,{" "}
          <a href="/tools/daily-planner">daily planner</a>, and{" "}
          <a href="/tools/meeting-agenda-builder">meeting agenda builder</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add teammates and their available days.",
      "Set default shift length and number of shifts per day.",
      "Let the tool suggest an assignment or drag manually.",
      "Print the week or copy as plain text.",
    ],
  },
  "gpa-calculator": {
    render: () => <GpaCalculator />,
    explainer: (
      <>
        <p>
          Calculate weighted and unweighted GPA on the US 4.0 scale from a list of courses with letter grades and
          credit hours. Supports honors and AP bumps with a per-class weight toggle. Shows cumulative and
          term-by-term GPAs.
        </p>
        <p>
          Related: <a href="/tools/grade-calculator">grade calculator</a>,{" "}
          <a href="/tools/percentage-calculator">percentage calculator</a>,{" "}
          <a href="/tools/average-calculator">average calculator</a>, and{" "}
          <a href="/tools/ratio-calculator">ratio calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add each course — name, letter grade, credit hours.",
      "Toggle weighted for honors / AP classes.",
      "Read unweighted and weighted GPA side by side.",
      "Copy the summary for a résumé or transcript prep.",
    ],
  },
  "grade-calculator": {
    render: () => <GradeCalculator />,
    explainer: (
      <>
        <p>
          Work out a final course grade from weighted categories (homework 20%, midterm 30%, final 50%, etc.) or
          figure out exactly what you need on the final to hit a target grade. Essential during exam prep and
          end-of-semester planning.
        </p>
        <p>
          Related: <a href="/tools/gpa-calculator">GPA calculator</a>,{" "}
          <a href="/tools/percentage-calculator">percentage calculator</a>,{" "}
          <a href="/tools/average-calculator">average calculator</a>, and{" "}
          <a href="/tools/ratio-calculator">ratio calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter each category, its weight, and your current score.",
      "Add the final exam and the target grade.",
      "Read your current weighted grade and the score needed on the final.",
      "Plan study time accordingly.",
    ],
  },
  "fuel-cost-calculator": {
    render: () => <FuelCostCalculator />,
    explainer: (
      <>
        <p>
          Estimate fuel cost for a drive: distance, MPG (or L/100km), and price per gallon or liter. Useful for
          budgeting a road trip, comparing driving vs flying, and splitting costs fairly with carpoolers.
        </p>
        <p>
          Pair with <a href="/tools/trip-cost-calculator">trip cost calculator</a>,{" "}
          <a href="/tools/budget-calculator">budget calculator</a>,{" "}
          <a href="/tools/expense-split-calculator">expense split calculator</a>, and{" "}
          <a href="/tools/length-converter">length converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick units — miles/gallon or km/litres.",
      "Enter distance, vehicle MPG, and fuel price.",
      "Add round-trip toggle and passenger count.",
      "Read total cost and per-person share.",
    ],
  },
  "trip-cost-calculator": {
    render: () => <TripCostCalculator />,
    explainer: (
      <>
        <p>
          Add flights, lodging, food, activities, transport, and insurance — see the total cost, per-day spend,
          and per-person share. Split across travelers with one click. A much cleaner way to pre-budget a
          vacation than a throwaway spreadsheet.
        </p>
        <p>
          Pair with <a href="/tools/fuel-cost-calculator">fuel cost calculator</a>,{" "}
          <a href="/tools/expense-split-calculator">expense split calculator</a>,{" "}
          <a href="/tools/budget-calculator">budget calculator</a>, and{" "}
          <a href="/tools/currency-converter">currency converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add line items: flights, lodging, food, activities.",
      "Set trip length and number of travelers.",
      "Read total cost, per-day, and per-person.",
      "Adjust to match the budget before booking.",
    ],
  },
  "smoking-cost-calculator": {
    render: () => <SmokingCostCalculator />,
    explainer: (
      <>
        <p>
          Enter packs per day and pack price — see the monthly, yearly, 10-year, and lifetime cost. It's a gut
          check: the number is almost always bigger than you expect, and for many people that's the first step
          toward quitting.
        </p>
        <p>
          Related: <a href="/tools/subscription-cost-calculator">subscription cost calculator</a>,{" "}
          <a href="/tools/caffeine-intake-calculator">caffeine intake calculator</a>,{" "}
          <a href="/tools/alcohol-unit-calculator">alcohol unit calculator</a>,{" "}
          <a href="/tools/budget-calculator">budget calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter packs per day and price per pack.",
      "Adjust for expected price inflation.",
      "Read monthly, yearly, 10-year, and lifetime costs.",
      "Compare to what the same money could compound into (see compound interest).",
    ],
  },
  "alcohol-unit-calculator": {
    render: () => <AlcoholUnitCalculator />,
    explainer: (
      <>
        <p>
          Convert any drink — beer, wine, spirits, cocktails — to US standard drinks (14g alcohol) or UK units
          (8g alcohol). Track a week's intake against public-health low-risk guidelines and see a rolling
          average.
        </p>
        <p>
          Related: <a href="/tools/caffeine-intake-calculator">caffeine intake calculator</a>,{" "}
          <a href="/tools/water-intake-calculator">water intake calculator</a>,{" "}
          <a href="/tools/calorie-calculator">calorie calculator</a>, and{" "}
          <a href="/tools/heart-rate-zone-calculator">heart rate zone calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter each drink: type, volume, and ABV.",
      "Toggle units between US standard drinks and UK units.",
      "Add a week's worth of drinks.",
      "Read the total and how it compares to low-risk limits.",
    ],
  },
  "caffeine-intake-calculator": {
    render: () => <CaffeineIntakeCalculator />,
    explainer: (
      <>
        <p>
          Log coffee, tea, soda, and energy drinks and see daily caffeine in mg, with the 400 mg adult safe-limit
          as a visible benchmark. Sensitive to afternoon timing too, so you can see how late caffeine interferes
          with sleep.
        </p>
        <p>
          Pair with <a href="/tools/water-intake-calculator">water intake calculator</a>,{" "}
          <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>,{" "}
          <a href="/tools/alcohol-unit-calculator">alcohol unit calculator</a>, and{" "}
          <a href="/tools/calorie-calculator">calorie calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Log each drink with size and time.",
      "Read total mg and time-of-last-drink.",
      "Compare to the 400 mg safe-limit line.",
      "Move late drinks earlier if sleep is an issue.",
    ],
  },
  "sleep-cycle-calculator": {
    render: () => <SleepCycleCalculator />,
    explainer: (
      <>
        <p>
          Pick a wake-up time and see the best bedtimes aligned with the 90-minute sleep cycle — waking at the
          end of a cycle feels less groggy than waking in the middle. Or enter bedtime and get wake times.
          Accounts for typical sleep-onset latency.
        </p>
        <p>
          Pair with <a href="/tools/heart-rate-zone-calculator">heart rate zone calculator</a>,{" "}
          <a href="/tools/caffeine-intake-calculator">caffeine intake calculator</a>,{" "}
          <a href="/tools/water-intake-calculator">water intake calculator</a>, and{" "}
          <a href="/tools/bmr-calculator">BMR calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick wake-up time or bedtime.",
      "Adjust the typical time to fall asleep (default 15 min).",
      "Read the recommended bedtimes or wake times.",
      "Pick the one that gets you 5 or 6 full cycles.",
    ],
  },
  "heart-rate-zone-calculator": {
    render: () => <HeartRateZoneCalculator />,
    explainer: (
      <>
        <p>
          Find your max heart rate and the five training zones (recovery, aerobic, tempo, threshold, VO2 max) in
          one go. Supports the 220-age formula and the more accurate Tanaka formula, plus a Karvonen option
          using resting heart rate.
        </p>
        <p>
          Pair with <a href="/tools/running-pace-calculator">running pace calculator</a>,{" "}
          <a href="/tools/bmr-calculator">BMR calculator</a>,{" "}
          <a href="/tools/calorie-calculator">calorie calculator</a>, and{" "}
          <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter age and optionally resting heart rate.",
      "Pick a formula (220-age or Tanaka).",
      "Read max HR and zone 1–5 ranges.",
      "Match zones to your workout plan.",
    ],
  },
  "cooking-converter": {
    render: () => <CookingConverter />,
    explainer: (
      <>
        <p>
          Convert cups, tablespoons, teaspoons, grams, ounces, and milliliters — with ingredient-aware density
          for flour, sugar, butter, rice, and common pantry staples. Switch between US, UK, and metric cup
          sizes. Perfect for adapting recipes written in an unfamiliar system.
        </p>
        <p>
          Pair with <a href="/tools/recipe-scaler">recipe scaler</a>,{" "}
          <a href="/tools/temperature-converter">temperature converter</a>,{" "}
          <a href="/tools/weight-converter">weight converter</a>, and{" "}
          <a href="/tools/volume-converter">volume converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick an ingredient (flour, sugar, butter…) or leave as water.",
      "Enter amount in your starting unit.",
      "Read equivalents in cups, grams, ounces, and ml.",
      "Switch cup size if a recipe is UK or Australian.",
    ],
  },
  "recipe-scaler": {
    render: () => <RecipeScaler />,
    explainer: (
      <>
        <p>
          Paste any ingredient list and scale every amount by a ratio: 2x for a bigger batch, 0.5x for half,
          custom factor for any portion. Handles fractions, decimals, mixed numbers, and "to taste" items left
          unchanged.
        </p>
        <p>
          Pair with <a href="/tools/cooking-converter">cooking converter</a>,{" "}
          <a href="/tools/fraction-calculator">fraction calculator</a>,{" "}
          <a href="/tools/volume-converter">volume converter</a>, and{" "}
          <a href="/tools/weight-converter">weight converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste the ingredient list.",
      "Pick a multiplier (2x, 0.5x, or custom).",
      "Review the scaled amounts.",
      "Copy the scaled list.",
    ],
  },
  "priority-matrix": {
    render: () => <PriorityMatrix />,
    explainer: (
      <>
        <p>
          The classic Eisenhower 2x2 — urgent/important — turned into a drag-and-drop tool. Drop tasks into the
          right quadrant and the tool spits out a Do / Decide / Delegate / Delete list you can actually act on.
          Great for overwhelmed Monday mornings.
        </p>
        <p>
          Pair with <a href="/tools/to-do-list">to-do list</a>,{" "}
          <a href="/tools/daily-planner">daily planner</a>,{" "}
          <a href="/tools/weekly-planner">weekly planner</a>, and{" "}
          <a href="/tools/meeting-agenda-builder">meeting agenda builder</a>.
        </p>
      </>
    ),
    howToUse: [
      "Brain-dump every task into the input.",
      "Drag each into one of four quadrants.",
      "Read the outputted Do / Decide / Delegate / Delete list.",
      "Copy it as a plain-text plan for the day or week.",
    ],
  },
  "packing-list-generator": {
    render: () => <PackingListGenerator />,
    explainer: (
      <>
        <p>
          Generate a packing list based on trip length, destination weather, and activities — beach, hiking,
          business, winter. Starts with a smart default and lets you check off items as you pack. The list
          stays in your browser (no account needed).
        </p>
        <p>
          Pair with <a href="/tools/trip-cost-calculator">trip cost calculator</a>,{" "}
          <a href="/tools/daily-planner">daily planner</a>,{" "}
          <a href="/tools/weekly-planner">weekly planner</a>, and{" "}
          <a href="/tools/to-do-list">to-do list</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick trip length, climate, and activities.",
      "Review the suggested list — add or remove items.",
      "Check items off as you pack.",
      "Print or copy the list for your travel buddy.",
    ],
  },
  "deadline-calculator": {
    render: () => <DeadlineCalculator />,
    explainer: (
      <>
        <p>
          Add business days or working hours to a start date and get the real-world deadline — weekends and US
          federal holidays excluded. Useful for project timelines, SLA calculations, and contract deadlines that
          say "within 10 business days".
        </p>
        <p>
          Pair with <a href="/tools/date-difference-calculator">date difference calculator</a>,{" "}
          <a href="/tools/time-duration-calculator">time duration calculator</a>,{" "}
          <a href="/tools/countdown-timer">countdown timer</a>, and{" "}
          <a href="/tools/public-holidays">public holidays</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick the start date.",
      "Enter business days or working hours to add.",
      "Optionally include US federal holidays.",
      "Read the resulting deadline.",
    ],
  },
  "lunch-break-calculator": {
    render: () => <LunchBreakCalculator />,
    explainer: (
      <>
        <p>
          Enter start and end times and whether lunch is paid — see net worked hours, overtime edge, and weekly
          totals. Handy for hourly employees who track lunch manually, and for managers sanity-checking
          time-sheets.
        </p>
        <p>
          Pair with <a href="/tools/overtime-calculator">overtime calculator</a>,{" "}
          <a href="/tools/shift-scheduler">shift scheduler</a>,{" "}
          <a href="/tools/time-duration-calculator">time duration calculator</a>, and{" "}
          <a href="/tools/pto-calculator">PTO calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter clock-in and clock-out.",
      "Set lunch length and whether it's paid.",
      "Read net worked hours per day and the weekly total.",
      "Flag overtime days if applicable.",
    ],
  },
  "daily-planner": {
    render: () => <DailyPlanner />,
    explainer: (
      <>
        <p>
          Time-box your day in 15- or 30-minute blocks. Add tasks, set durations, and the planner fills in
          start/end times automatically. Good for deep-work heavy days when you want explicit meeting and focus
          slots instead of an open calendar.
        </p>
        <p>
          Pair with <a href="/tools/weekly-planner">weekly planner</a>,{" "}
          <a href="/tools/priority-matrix">priority matrix</a>,{" "}
          <a href="/tools/meeting-agenda-builder">meeting agenda builder</a>, and{" "}
          <a href="/tools/pomodoro-timer">pomodoro timer</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a start time and day length.",
      "Add each task and its minutes.",
      "Drag to reorder — times recalculate.",
      "Print or copy the day's plan.",
    ],
  },
  "weekly-planner": {
    render: () => <WeeklyPlanner />,
    explainer: (
      <>
        <p>
          A 7-day week view for top priorities, recurring routines, and per-day blocks. Designed for the weekly
          review: on Sunday you fill it; by Friday you see what shipped. Stays entirely in your browser so
          nothing to sync.
        </p>
        <p>
          Pair with <a href="/tools/daily-planner">daily planner</a>,{" "}
          <a href="/tools/priority-matrix">priority matrix</a>,{" "}
          <a href="/tools/meeting-agenda-builder">meeting agenda builder</a>, and{" "}
          <a href="/tools/shift-scheduler">shift scheduler</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add the top 3 priorities for the week.",
      "Add recurring routines by day.",
      "Fill in per-day blocks.",
      "Print or keep open in a tab all week.",
    ],
  },
  "meeting-agenda-builder": {
    render: () => <MeetingAgendaBuilder />,
    explainer: (
      <>
        <p>
          Build a timed meeting agenda — topic, owner, minutes — and copy it to calendar invite or email. The
          tool flags over-running agendas and suggests a finish time so you book the right calendar slot.
        </p>
        <p>
          Pair with <a href="/tools/meeting-cost-calculator">meeting cost calculator</a>,{" "}
          <a href="/tools/priority-matrix">priority matrix</a>,{" "}
          <a href="/tools/daily-planner">daily planner</a>, and{" "}
          <a href="/tools/weekly-planner">weekly planner</a>.
        </p>
      </>
    ),
    howToUse: [
      "Add meeting title and expected attendees.",
      "Add each topic with an owner and minutes.",
      "Review the auto-calculated finish time.",
      "Copy the agenda into the calendar invite body.",
    ],
  },
  "decision-wheel": {
    render: () => <DecisionWheel />,
    explainer: (
      <>
        <p>
          Type options, spin the wheel, get a random pick. Good for lunch fights, tie-breakers, and team
          icebreakers where someone just needs to call it. You can remove a pick after it's chosen so the wheel
          effectively draws without replacement.
        </p>
        <p>
          Related random helpers: <a href="/tools/decision-maker">decision maker</a>,{" "}
          <a href="/tools/coin-flip">coin flip</a>,{" "}
          <a href="/tools/dice-roller">dice roller</a>, and{" "}
          <a href="/tools/random-name-generator">random name generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type each option on a new line.",
      "Spin the wheel.",
      "Remove the chosen option if you want draw-without-replacement.",
      "Copy the pick to Slack or chat.",
    ],
  },

  // ---------- Wave 8 + 9 (60 new tools) ----------
  "caesar-cipher": {
    render: () => <CaesarCipher />,
    explainer: (
      <>
        <p>Shift every letter by a fixed number of positions to encode or decode a message. Classic Caesar cipher and ROT13 in one — useful for puzzles, scouts, and basic obfuscation (not real security).</p>
      </>
    ),
    howToUse: [
      "Paste the message.",
      "Pick a shift (1–25) or use the ROT13 button.",
      "Toggle Encode / Decode.",
      "Copy the result.",
    ],
  },
  "morse-code-translator": {
    render: () => <MorseCodeTranslator />,
    explainer: (
      <>
        <p>Convert text to Morse code and back, and optionally play the result as audio at adjustable speed. Handles letters, digits, and common punctuation.</p>
      </>
    ),
    howToUse: [
      "Paste text or Morse code.",
      "Choose direction (Text → Morse or Morse → Text).",
      "Press Play to hear it.",
      "Copy the translated output.",
    ],
  },
  "binary-text-encoder": {
    render: () => <BinaryTextEncoder />,
    explainer: (
      <>
        <p>Convert ASCII text to 8-bit binary (and back). Useful for computer science homework, cipher puzzles, or explaining how text becomes bytes.</p>
      </>
    ),
    howToUse: [
      "Paste text or a binary string.",
      "Pick the direction of conversion.",
      "Copy the result.",
      "Tweak spacing if you need a different block size.",
    ],
  },
  "ascii-art-generator": {
    render: () => <AsciiArtGenerator />,
    explainer: (
      <>
        <p>Turn plain text into oversized ASCII-art letters with multiple font styles. Great for terminal banners, READMEs, and commit messages.</p>
      </>
    ),
    howToUse: [
      "Type the text.",
      "Pick a font style.",
      "Copy the ASCII art.",
      "Paste into any monospaced surface.",
    ],
  },
  "roman-numeral-converter": {
    render: () => <RomanNumeralConverter />,
    explainer: (
      <>
        <p>Convert Arabic numbers to Roman numerals and back, up to the standard upper bound of 3,999,999 using overline notation.</p>
      </>
    ),
    howToUse: [
      "Enter a number or Roman numeral.",
      "Pick the direction.",
      "Read the converted value.",
      "Copy to clipboard.",
    ],
  },
  "bionic-reading-formatter": {
    render: () => <BionicReadingFormatter />,
    explainer: (
      <>
        <p>Reformat text so the first portion of each word is bold. Easier to skim long articles and can help readers with attention fatigue.</p>
      </>
    ),
    howToUse: [
      "Paste the text.",
      "Adjust the bold-ratio slider.",
      "Preview the reformatted version.",
      "Copy the styled text (HTML).",
    ],
  },
  "text-summarizer": {
    render: () => <TextSummarizer />,
    explainer: (
      <>
        <p>Paste an article, get an extractive summary in 3, 5, or 10 sentences. Everything runs in your browser — no upload, no account.</p>
      </>
    ),
    howToUse: [
      "Paste the article.",
      "Pick summary length.",
      "Read the summary.",
      "Copy or refine.",
    ],
  },
  "base64-to-image": {
    render: () => <Base64ToImage />,
    explainer: (
      <>
        <p>Paste a base64 image string (with or without data: prefix) and instantly preview or download the image. Reverse of the image-to-base64 tool.</p>
      </>
    ),
    howToUse: [
      "Paste the base64 string.",
      "Preview the decoded image.",
      "Download as PNG or JPG.",
    ],
  },
  "image-to-base64": {
    render: () => <ImageToBase64 />,
    explainer: (
      <>
        <p>Drop an image and get a base64 data URL you can paste into HTML, CSS, or an API payload. All in your browser, nothing uploaded.</p>
      </>
    ),
    howToUse: [
      "Drop or pick an image.",
      "Copy the data URL.",
      "Paste into code, email, or a CMS.",
    ],
  },
  "discord-timestamp": {
    render: () => <DiscordTimestamp />,
    explainer: (
      <>
        <p>Pick a date and time, get every Discord timestamp format — short date, long date, relative — ready to paste into chat.</p>
      </>
    ),
    howToUse: [
      "Pick the date and time.",
      "Pick your timezone.",
      "Copy the format you need.",
    ],
  },
  "mock-data-generator": {
    render: () => <MockDataGenerator />,
    explainer: (
      <>
        <p>Generate realistic fake rows — names, emails, companies, dates — as JSON, CSV, or SQL inserts. Useful for seeding tests and demos.</p>
      </>
    ),
    howToUse: [
      "Pick fields and row count.",
      "Choose export format.",
      "Click generate.",
      "Copy or download the dataset.",
    ],
  },
  "json-to-typescript": {
    render: () => <JsonToTypescript />,
    explainer: (
      <>
        <p>Paste any JSON object and get a matching TypeScript interface — nested types, optional fields, and array detection included.</p>
      </>
    ),
    howToUse: [
      "Paste a JSON object.",
      "Name the root interface.",
      "Copy the generated TypeScript.",
    ],
  },
  "css-to-tailwind": {
    render: () => <CssToTailwind />,
    explainer: (
      <>
        <p>Paste a raw CSS rule and get the equivalent Tailwind utility classes. Handles common properties like padding, margins, colors, and display.</p>
      </>
    ),
    howToUse: [
      "Paste CSS (one rule).",
      "Copy the Tailwind classes.",
      "Paste into your markup.",
    ],
  },
  "tailwind-to-css": {
    render: () => <TailwindToCss />,
    explainer: (
      <>
        <p>Reverse of css-to-tailwind: paste Tailwind classes, get the CSS they compile to. Handy when debugging or moving off Tailwind.</p>
      </>
    ),
    howToUse: [
      "Paste a list of Tailwind classes.",
      "Read the CSS output.",
      "Copy the result.",
    ],
  },
  "html-to-jsx": {
    render: () => <HtmlToJsx />,
    explainer: (
      <>
        <p>Paste raw HTML and get valid JSX — class becomes className, attributes are camelCased, self-closing tags are fixed.</p>
      </>
    ),
    howToUse: [
      "Paste the HTML snippet.",
      "Copy the JSX output.",
      "Paste into your React component.",
    ],
  },
  "sql-to-json": {
    render: () => <SqlToJson />,
    explainer: (
      <>
        <p>Paste a simple CREATE TABLE or INSERT statement and get structured JSON — rows, columns, types. Good for mocking APIs from a schema.</p>
      </>
    ),
    howToUse: [
      "Paste SQL.",
      "Pick output shape (rows, schema, or both).",
      "Copy the JSON.",
    ],
  },
  "gitignore-generator": {
    render: () => <GitignoreGenerator />,
    explainer: (
      <>
        <p>Pick your stack — Node, Python, Go, Rust, macOS, Windows — and assemble a clean .gitignore. No more hunting GitHub for the right template.</p>
      </>
    ),
    howToUse: [
      "Tick the languages and OS targets.",
      "Preview the combined file.",
      "Copy or download .gitignore.",
    ],
  },
  "readme-generator": {
    render: () => <ReadmeGenerator />,
    explainer: (
      <>
        <p>Answer a short form — name, tagline, install, usage — and get a polished README.md with badges, headings, and the boring boilerplate filled in.</p>
      </>
    ),
    howToUse: [
      "Fill in project name, tagline, and usage snippet.",
      "Pick sections to include.",
      "Copy or download the Markdown.",
    ],
  },
  "regex-builder": {
    render: () => <RegexBuilder />,
    explainer: (
      <>
        <p>Build a regex visually: add patterns, groups, quantifiers, and anchors. Live-test against sample strings without memorizing the syntax.</p>
      </>
    ),
    howToUse: [
      "Describe what you want to match.",
      "Click to add groups and modifiers.",
      "Test against sample input.",
      "Copy the final pattern.",
    ],
  },
  "exif-viewer": {
    render: () => <ExifViewer />,
    explainer: (
      <>
        <p>Drop a JPEG and see all its EXIF metadata — camera model, shutter speed, GPS coordinates. Runs locally in your browser; nothing leaves your device.</p>
      </>
    ),
    howToUse: [
      "Drop or pick a JPEG.",
      "Scroll the extracted tag list.",
      "Copy any field you need.",
    ],
  },
  "exif-remover": {
    render: () => <ExifRemover />,
    explainer: (
      <>
        <p>Strip every EXIF tag (including GPS) by re-encoding the image in-browser. Protects your location and camera fingerprint before posting online.</p>
      </>
    ),
    howToUse: [
      "Drop the image.",
      "Wait for the clean copy.",
      "Download the metadata-free image.",
    ],
  },
  "passport-photo-maker": {
    render: () => <PassportPhotoMaker />,
    explainer: (
      <>
        <p>Upload a photo, pick a country preset (US, UK, Schengen, India, Canada), and export a print-ready passport photo at 300 DPI with correct sizing.</p>
      </>
    ),
    howToUse: [
      "Upload your photo.",
      "Pick the country / visa preset.",
      "Crop your head within the guide.",
      "Download the print-ready image.",
    ],
  },
  "signature-drawer": {
    render: () => <SignatureDrawer />,
    explainer: (
      <>
        <p>Draw your signature with a mouse, trackpad, or touch — and export it as transparent PNG. Good for signing PDFs without printing.</p>
      </>
    ),
    howToUse: [
      "Draw in the canvas.",
      "Adjust line thickness and color.",
      "Download as transparent PNG.",
    ],
  },
  "profile-pic-circle-cropper": {
    render: () => <ProfilePicCircleCropper />,
    explainer: (
      <>
        <p>Upload an image and crop it into a perfect circle for social profiles and avatars. Exports a transparent PNG.</p>
      </>
    ),
    howToUse: [
      "Upload your image.",
      "Drag to position and zoom.",
      "Download the circular crop.",
    ],
  },
  "image-blur-censor": {
    render: () => <ImageBlurCensor />,
    explainer: (
      <>
        <p>Drag boxes over faces, names, or credit-card numbers and pick blur, pixelate, or black-bar censoring. Everything stays local.</p>
      </>
    ),
    howToUse: [
      "Drop the image.",
      "Drag boxes over areas to censor.",
      "Pick a censor style.",
      "Download the censored image.",
    ],
  },
  "photo-collage": {
    render: () => <PhotoCollage />,
    explainer: (
      <>
        <p>Upload 2–8 photos and arrange them in grids (2×1 through 4×2). Export one combined image for social posts, birthday cards, or trip recaps.</p>
      </>
    ),
    howToUse: [
      "Upload your photos.",
      "Pick a layout.",
      "Adjust spacing and background.",
      "Download the collage.",
    ],
  },
  "meme-generator": {
    render: () => <MemeGenerator />,
    explainer: (
      <>
        <p>Classic top-and-bottom text meme maker. Upload any image (or use a preset), type the lines, and export a PNG — white Impact text with black outline, the way memes want.</p>
      </>
    ),
    howToUse: [
      "Upload an image.",
      "Type the top and bottom text.",
      "Adjust font size.",
      "Download the meme.",
    ],
  },
  "youtube-thumbnail-downloader": {
    render: () => <YoutubeThumbnailDownloader />,
    explainer: (
      <>
        <p>Paste a YouTube URL and download its thumbnail in every available size (max, HQ, MQ, SD). Uses the public thumbnail endpoint — no scraping.</p>
      </>
    ),
    howToUse: [
      "Paste a YouTube URL.",
      "Pick the size.",
      "Download the thumbnail.",
    ],
  },
  "tweet-thread-splitter": {
    render: () => <TweetThreadSplitter />,
    explainer: (
      <>
        <p>Paste long text and split it into numbered 280-character tweets. Breaks on sentence boundaries, not mid-word, so each chunk reads cleanly.</p>
      </>
    ),
    howToUse: [
      "Paste the article.",
      "Adjust the per-tweet length if needed.",
      "Copy each tweet in order.",
    ],
  },
  "username-generator": {
    render: () => <UsernameGenerator />,
    explainer: (
      <>
        <p>Generate clean, available-feeling usernames — word pairs, adjective+noun combos, random letters — with a deterministic seed so you can regenerate.</p>
      </>
    ),
    howToUse: [
      "Pick style and length.",
      "Click generate.",
      "Copy the username you like.",
    ],
  },
  "email-signature-builder": {
    render: () => <EmailSignatureBuilder />,
    explainer: (
      <>
        <p>Fill in your name, role, links, and photo URL — export a clean HTML email signature you can paste into Gmail, Outlook, or Apple Mail.</p>
      </>
    ),
    howToUse: [
      "Fill in the fields.",
      "Preview the rendered signature.",
      "Copy as rich text (ClipboardItem) or HTML.",
    ],
  },
  "certificate-generator": {
    render: () => <CertificateGenerator />,
    explainer: (
      <>
        <p>Generate a printable certificate — recipient name, course, signature line — with your logo and a clean classic layout. Exports PDF.</p>
      </>
    ),
    howToUse: [
      "Fill in recipient, course, and date.",
      "Upload logo (optional).",
      "Preview the certificate.",
      "Download as PDF.",
    ],
  },
  "business-card-designer": {
    render: () => <BusinessCardDesigner />,
    explainer: (
      <>
        <p>Design a two-sided business card (name, role, contact) at print-ready 300 DPI. Pick a layout and export a PDF you can send to any printer.</p>
      </>
    ),
    howToUse: [
      "Fill in the card fields.",
      "Pick a layout.",
      "Preview front and back.",
      "Download the print-ready PDF.",
    ],
  },
  "resume-skeleton-builder": {
    render: () => <ResumeSkeletonBuilder />,
    explainer: (
      <>
        <p>Answer a short form and get a clean, ATS-safe resume template — no tables, no icons, just strong typography. Export as HTML or print-ready PDF.</p>
      </>
    ),
    howToUse: [
      "Fill in contact, experience, and skills.",
      "Preview the layout.",
      "Download as HTML or PDF.",
    ],
  },
  "cover-letter-builder": {
    render: () => <CoverLetterBuilder />,
    explainer: (
      <>
        <p>Fill in company, role, and one highlight — get a formatted cover letter with a working opener, body, and close. Export as PDF or copy as text.</p>
      </>
    ),
    howToUse: [
      "Fill in the fields.",
      "Edit the generated letter.",
      "Copy or download as PDF.",
    ],
  },
  "image-to-text": {
    render: () => <ImageToText />,
    explainer: (
      <>
        <p>Drop an image of text — a receipt, screenshot, scanned page — and pull out the text via in-browser OCR. Supports 15 languages.</p>
      </>
    ),
    howToUse: [
      "Drop the image.",
      "Pick a language.",
      "Wait for OCR to finish.",
      "Copy the extracted text.",
    ],
  },
  "handwriting-to-text": {
    render: () => <HandwritingToText />,
    explainer: (
      <>
        <p>Like image-to-text but tuned for handwritten notes. Uses an OCR mode optimized for sparse text with more forgiving segmentation.</p>
      </>
    ),
    howToUse: [
      "Drop the handwritten image.",
      "Wait for recognition.",
      "Clean up the output as needed.",
      "Copy the text.",
    ],
  },
  "voice-recorder": {
    render: () => <VoiceRecorder />,
    explainer: (
      <>
        <p>Press record, talk, download the audio. Works entirely in-browser via the microphone — no upload, no account, no watermark.</p>
      </>
    ),
    howToUse: [
      "Grant microphone access.",
      "Press record and talk.",
      "Stop when finished.",
      "Download the audio.",
    ],
  },
  "audio-trimmer": {
    render: () => <AudioTrimmer />,
    explainer: (
      <>
        <p>Upload an audio file, pick start and end points on the waveform, and export a trimmed WAV. Good for shaving intros, outros, and silences.</p>
      </>
    ),
    howToUse: [
      "Upload an audio file.",
      "Drag handles to set start and end.",
      "Preview the clip.",
      "Download the trimmed WAV.",
    ],
  },
  "audio-silence-remover": {
    render: () => <AudioSilenceRemover />,
    explainer: (
      <>
        <p>Detect and strip quiet sections from an audio file based on a threshold and minimum duration. Useful for cleaning up voice notes and podcasts.</p>
      </>
    ),
    howToUse: [
      "Upload the file.",
      "Adjust silence threshold and minimum duration.",
      "Preview the shortened track.",
      "Download the cleaned WAV.",
    ],
  },
  "audio-speed-changer": {
    render: () => <AudioSpeedChanger />,
    explainer: (
      <>
        <p>Speed up or slow down audio without changing pitch beyond the usual speed-coupled drift. Useful for making lectures skimmable or music playable.</p>
      </>
    ),
    howToUse: [
      "Upload the audio.",
      "Pick a playback rate (0.5×–2×).",
      "Preview.",
      "Download the resampled WAV.",
    ],
  },
  "audio-pitch-changer": {
    render: () => <AudioPitchChanger />,
    explainer: (
      <>
        <p>Shift the pitch of an audio file up or down by semitones. Fast, in-browser, no plug-ins.</p>
      </>
    ),
    howToUse: [
      "Upload the audio.",
      "Shift by +/− semitones.",
      "Preview.",
      "Download the pitched WAV.",
    ],
  },
  "video-trimmer": {
    render: () => <VideoTrimmer />,
    explainer: (
      <>
        <p>Upload a video, pick start and end points, export the trimmed clip. Runs via captureStream + MediaRecorder — no server upload.</p>
      </>
    ),
    howToUse: [
      "Upload the video.",
      "Set start and end.",
      "Preview the clip.",
      "Download the trimmed video.",
    ],
  },
  "video-to-gif": {
    render: () => <VideoToGif />,
    explainer: (
      <>
        <p>Turn a short video into a lightweight looping clip (WebM, labeled as a GIF-alternative). Browser-native, no external libs.</p>
      </>
    ),
    howToUse: [
      "Upload a short video (under 15s works best).",
      "Trim to the loop.",
      "Export the WebM clip.",
    ],
  },
  "video-mute": {
    render: () => <VideoMute />,
    explainer: (
      <>
        <p>Strip audio from a video cleanly. Outputs video-only, same resolution and framerate, no re-encode of picture quality.</p>
      </>
    ),
    howToUse: [
      "Upload the video.",
      "Confirm muted preview.",
      "Download the silent video.",
    ],
  },
  "video-frame-extractor": {
    render: () => <VideoFrameExtractor />,
    explainer: (
      <>
        <p>Scrub to any frame or auto-extract N evenly-spaced frames. Export each as a PNG. Good for thumbnails, before/after posts, or storyboards.</p>
      </>
    ),
    howToUse: [
      "Upload the video.",
      "Scrub to a frame or pick the auto count.",
      "Download the PNG(s).",
    ],
  },
  "screen-recorder": {
    render: () => <ScreenRecorder />,
    explainer: (
      <>
        <p>Record your screen (and optional microphone) straight from the browser via getDisplayMedia. Output is a downloadable WebM.</p>
      </>
    ),
    howToUse: [
      "Click record and pick the screen / window.",
      "Optionally add microphone.",
      "Stop when done.",
      "Download the recording.",
    ],
  },
  "text-to-speech": {
    render: () => <TextToSpeech />,
    explainer: (
      <>
        <p>Paste text, pick a voice from your system, and listen. Uses the browser's built-in Web Speech synthesis — zero network, zero cost.</p>
      </>
    ),
    howToUse: [
      "Paste text.",
      "Pick voice and rate.",
      "Press play.",
    ],
  },
  "speech-to-text": {
    render: () => <SpeechToText />,
    explainer: (
      <>
        <p>Talk into your mic and get a live transcript via the browser's speech recognition API. Works best in Chrome-family browsers.</p>
      </>
    ),
    howToUse: [
      "Grant microphone access.",
      "Press start and speak.",
      "Copy the transcript when done.",
    ],
  },
  "voice-note-transcriber": {
    render: () => <VoiceNoteTranscriber />,
    explainer: (
      <>
        <p>Record and transcribe at the same time: capture the audio file and the live transcript side-by-side for meetings, interviews, or notes.</p>
      </>
    ),
    howToUse: [
      "Press record.",
      "Speak.",
      "Stop — audio and transcript are both available to download/copy.",
    ],
  },
  "ai-prompt-generator": {
    render: () => <AiPromptGenerator />,
    explainer: (
      <>
        <p>Turn a vague intent into a structured prompt with role, task, context, constraints, audience, and output format. Paste straight into ChatGPT, Claude, or Gemini.</p>
      </>
    ),
    howToUse: [
      "Describe the goal.",
      "Pick role, audience, tone, and output format.",
      "Copy the generated prompt.",
    ],
  },
  "ai-prompt-library": {
    render: () => <AiPromptLibrary />,
    explainer: (
      <>
        <p>A curated library of prompt templates across writing, coding, marketing, career, and research. Search, filter, copy — no account required.</p>
      </>
    ),
    howToUse: [
      "Search or filter by category.",
      "Click Copy on the card.",
      "Paste into your AI chat and fill in the placeholders.",
    ],
  },
  "chat-prompt-builder": {
    render: () => <ChatPromptBuilder />,
    explainer: (
      <>
        <p>Build a clean system prompt with persona, do/don't rules, an example turn, and an output schema. Great for GPT builders and Claude Projects.</p>
      </>
    ),
    howToUse: [
      "Fill in persona, do/don't rules, and example.",
      "Watch the character and token estimate update.",
      "Copy the system prompt.",
    ],
  },
  "ai-image-prompt-builder": {
    render: () => <AiImagePromptBuilder />,
    explainer: (
      <>
        <p>Build structured image prompts: subject, style, camera, lighting, aspect, and negative prompt. Outputs formats for Midjourney, DALL·E, and Stable Diffusion.</p>
      </>
    ),
    howToUse: [
      "Fill in subject and pick style/camera/lighting.",
      "Set aspect and negative prompt.",
      "Pick the target model.",
      "Copy the formatted prompt.",
    ],
  },
  "ai-art-style-picker": {
    render: () => <AiArtStylePicker />,
    explainer: (
      <>
        <p>Browse 40+ art styles — photoreal, anime, watercolor, cyberpunk, flat vector — and click any card to copy a ready-to-use prompt snippet.</p>
      </>
    ),
    howToUse: [
      "Search or filter by category.",
      "Click a style card to copy the snippet.",
      "Paste next to your subject in any image model.",
    ],
  },
  "ai-token-counter": {
    render: () => <AiTokenCounter />,
    explainer: (
      <>
        <p>Estimate tokens, characters, and API cost for GPT-4o, GPT-4, Claude, Gemini, Llama, and more — before you hit send.</p>
      </>
    ),
    howToUse: [
      "Paste the text.",
      "Set assumed output tokens.",
      "Read the per-model cost estimate.",
    ],
  },
  "ai-model-compare": {
    render: () => <AiModelCompare />,
    explainer: (
      <>
        <p>Side-by-side spec sheet of frontier models — context window, price, multimodal support, strengths, weaknesses — so you can pick the right one.</p>
      </>
    ),
    howToUse: [
      "Filter by vendor and sort by the metric that matters.",
      "Tick models to compare head-to-head.",
      "Read the strengths/watch-out notes.",
    ],
  },
  "prompt-improver": {
    render: () => <PromptImprover />,
    explainer: (
      <>
        <p>Rule-based prompt linter. Paste a vague prompt, get a rewrite plus a checklist of what was missing (role, format, example, constraints).</p>
      </>
    ),
    howToUse: [
      "Paste your prompt.",
      "Read the rule findings and prompt score.",
      "Copy the improved version.",
    ],
  },
  "ai-chat-export-formatter": {
    render: () => <AiChatExportFormatter />,
    explainer: (
      <>
        <p>Paste a ChatGPT JSON export or Claude markdown transcript, get a clean transcript you can archive, share, or publish — as Markdown, HTML, TXT, or JSON.</p>
      </>
    ),
    howToUse: [
      "Paste the export.",
      "Auto-detect or pick the input format.",
      "Pick the output format.",
      "Copy or download the clean transcript.",
    ],
  },
  "ai-writing-humanizer": {
    render: () => <AiWritingHumanizer />,
    explainer: (
      <>
        <p>Strip the most common AI tells — 'delve into', 'in the realm of', 'tapestry', em-dash abuse — from AI-generated text. Rule-based, not a model call.</p>
      </>
    ),
    howToUse: [
      "Paste AI-generated writing.",
      "Read the humanized output and list of rules applied.",
      "Copy the cleaned-up version.",
    ],
  },
};
